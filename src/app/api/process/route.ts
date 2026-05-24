import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Configuração para Vercel (aumentar timeout para funções serverless)
export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('ERRO: GEMINI_API_KEY não configurada.');
      return NextResponse.json(
        { error: 'Configuração ausente: GEMINI_API_KEY não encontrada no ambiente.' },
        { status: 500 }
      );
    }

    const { code, language } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'O código é obrigatório para o processamento.' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Usamos o modelo flash para maior velocidade e menor custo
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-flash-latest',
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `
      Atue como um Arquiteto de Software Sênior e Especialista em Documentação.
      Analise o seguinte código em ${language}:

      "${code}"

      Sua tarefa é gerar documentação técnica detalhada.
      Responda ESTRITAMENTE em formato JSON com a seguinte estrutura:
      {
        "commentedCode": "O código original mas com comentários explicativos (JSDoc para JS/TS ou Docstrings para Python) inseridos em cada função e lógica complexa.",
        "summary": "Um resumo amigável e simples do que o código faz, ideal para iniciantes.",
        "functions": ["Lista das principais funções/métodos detectados no código."],
        "readme": "Conteúdo formatado em Markdown para um arquivo README.md profissional deste código, incluindo descrição, funcionalidades e exemplos de uso."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('A IA retornou uma resposta vazia.');
    }

    try {
      // Tenta fazer o parse direto (esperado por causa do responseMimeType)
      const jsonResponse = JSON.parse(text);
      return NextResponse.json(jsonResponse);
    } catch {
      console.warn('Falha no parse direto, tentando extração manual de JSON.');
      // Fallback: extrai JSON se houver lixo em volta (markdown blocks, etc)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const fallbackJson = JSON.parse(jsonMatch[0]);
        return NextResponse.json(fallbackJson);
      }
      throw new Error('Não foi possível extrair um JSON válido da resposta da IA.');
    }

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Erro no processamento da API Process:', error);
    
    let userFriendlyError = 'Ocorreu um erro interno ao processar seu código.';
    let statusCode = 500;

    // Tratamento de erros específicos do Gemini
    if (errorMessage.includes('API_KEY_INVALID')) {
      userFriendlyError = 'Chave da API inválida. Verifique suas configurações no Vercel.';
    } else if (errorMessage.includes('QUOTA_EXCEEDED')) {
      userFriendlyError = 'Limite de requisições atingido. Tente novamente em alguns minutos.';
      statusCode = 429;
    } else if (errorMessage.includes('SAFETY')) {
      userFriendlyError = 'O código fornecido foi bloqueado pelos filtros de segurança da IA.';
      statusCode = 400;
    } else if (errorMessage.includes('fetch failed')) {
      userFriendlyError = 'Falha de conexão com os servidores da Google AI.';
    }

    return NextResponse.json({ 
      error: userFriendlyError,
      message: errorMessage,
      stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
    }, { status: statusCode });
  }
}

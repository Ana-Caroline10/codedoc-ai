import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { code, language } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Atue como um Arquiteto de Software Sênior e Especialista em Documentação.
      Analise o seguinte código em ${language}:

      "${code}"

      Sua tarefa é gerar documentação técnica detalhada.
      Responda ESTRITAMENTE em formato JSON com a seguinte estrutura (não inclua markdown extra, apenas o JSON):
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
    
    // Clean potential markdown artifacts from AI response
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const jsonResponse = JSON.parse(cleanedText);

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Error processing code:', error);
    return NextResponse.json({ error: 'Erro ao processar o código com a IA.' }, { status: 500 });
  }
}

# PRD - CodeDoc AI

## 1. Visão Geral do Produto
O **CodeDoc AI** é uma ferramenta web projetada para simplificar a vida de desenvolvedores, automatizando a documentação de código, resumos de lógica e a criação de arquivos README. O foco é aumentar a produtividade e auxiliar iniciantes no entendimento de estruturas complexas.

### 1.1 Problema
- Documentação manual é demorada e muitas vezes negligenciada.
- Dificuldade em resumir lógicas complexas para terceiros (técnicos ou não).
- Barreiras de aprendizado para iniciantes que precisam entender o "porquê" por trás do código.

### 1.2 Público-Alvo
- Desenvolvedores Full Stack (JS/TS/Python).
- Iniciantes em programação buscando entender melhor a lógica de códigos existentes.
- Freelancers e profissionais que precisam entregar documentação clara e rápida.

### 1.3 Objetivos de Sucesso
- Redução do tempo gasto em documentação básica.
- Clareza imediata sobre a função de blocos de código colados.
- Facilidade na criação de READMEs padronizados.

---

## 2. Escopo do MVP

### 2.1 Funcionalidades (Must-Have)
1.  **Entrada de Código:** Editor de texto (TextArea) para colar código fonte.
2.  **Suporte a Linguagens:** JavaScript, TypeScript e Python.
3.  **Documentação Inline:** Geração de comentários (estilo JSDoc ou Docstrings) inseridos diretamente no código colado.
4.  **Resumo de Lógica:** Painel lateral com um resumo em linguagem natural do que o código faz.
5.  **Lista de Funções:** Detecção e listagem clara das funções encontradas no código.
6.  **Gerador de README:** Geração de um texto formatado em Markdown para o README do projeto, exibido na tela para cópia.
7.  **Histórico Local:** Persistência via `localStorage` para manter os últimos códigos processados pelo usuário.

### 2.2 Fora de Escopo (V2+)
- Detecção automática de Endpoints de APIs complexas (Express/FastAPI).
- Upload de arquivos ou pastas inteiras.
- Banco de dados centralizado ou contas de usuário.
- Suporte a linguagens de baixo nível (C/C++).

---

## 3. Requisitos Técnicos e Restrições
- **Frontend:** React ou Next.js (TypeScript).
- **Estilização:** Vanilla CSS ou CSS-in-JS (foco em estética moderna e clean).
- **Backend:** Sem banco de dados. Processamento via API de IA (ex: Gemini/OpenAI) no frontend ou via Serverless Functions da Vercel.
- **Persistência:** `localStorage`.
- **Deploy:** Vercel.
- **Repositório:** GitHub Público.

---

## 4. Experiência do Usuário (UX)
1.  **Fluxo Principal:** O usuário acessa a página -> Cola o código -> Clica em "Processar" -> Visualiza o código comentado, o resumo e o README gerado.
2.  **Visual:** Interface limpa, modo escuro (preferencial para devs), feedback visual durante o processamento (loading states).

---

## 5. Critérios de Aceite
- O código retornado deve conter comentários explicativos válidos para a linguagem escolhida.
- O resumo deve ser compreensível por uma pessoa leiga em programação.
- O README deve conter seções de "Descrição", "Funcionalidades" e "Como usar".
- Os dados devem persistir após um refresh da página (via localStorage).

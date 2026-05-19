'use client';

import { useState } from 'react';
import CodeEditor from '@/components/CodeEditor/CodeEditor';
import LinguagemSelector from '@/components/LinguagemSelector/LinguagemSelector';
import DocPanel from '@/components/DocPanel/DocPanel';
import MarkdownPreview from '@/components/MarkdownPreview/MarkdownPreview';
import { useClipboard } from '@/hooks/useClipboard';
import styles from './page.module.css';

interface ProcessResult {
  commentedCode: string;
  summary: string;
  functions: string[];
  readme: string;
}

type Tab = 'editor' | 'summary' | 'readme';

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('editor');
  const { copied, copy } = useClipboard();

  const handleProcess = async () => {
    if (!code.trim()) return;
    
    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setActiveTab('summary');
      } else {
        alert(data.error || 'Erro no processamento.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Falha na comunicação com o servidor.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyCode = () => {
    if (result) copy(result.commentedCode);
  };

  const handleCopyReadme = () => {
    if (result) copy(result.readme);
  };

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>CodeDoc AI</h1>
        <p className={styles.subtitle}>
          Documentação inteligente para seu código fonte em segundos.
        </p>
      </section>

      <section className={styles.editorSection}>
        <div className={styles.controls}>
          <LinguagemSelector value={language} onChange={setLanguage} />
          <button 
            className={styles.button} 
            onClick={handleProcess}
            disabled={isProcessing || !code.trim()}
          >
            {isProcessing ? 'Processando...' : 'Gerar Documentação'}
          </button>
        </div>

        {result && (
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'editor' ? styles.active : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              Código Comentado
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'summary' ? styles.active : ''}`}
              onClick={() => setActiveTab('summary')}
            >
              Resumo & Funções
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'readme' ? styles.active : ''}`}
              onClick={() => setActiveTab('readme')}
            >
              README.md
            </button>
          </div>
        )}

        <div className={styles.contentArea}>
          {activeTab === 'editor' && (
            <div className={styles.editorWrapper}>
              {result && (
                <button className={styles.floatingCopy} onClick={handleCopyCode}>
                  {copied ? 'Copiado!' : 'Copiar Código'}
                </button>
              )}
              <CodeEditor 
                value={result ? result.commentedCode : code} 
                onChange={result ? () => {} : setCode} 
              />
            </div>
          )}

          {activeTab === 'summary' && result && (
            <DocPanel summary={result.summary} functions={result.functions} />
          )}

          {activeTab === 'readme' && result && (
            <MarkdownPreview content={result.readme} onCopy={handleCopyReadme} />
          )}
        </div>
      </section>
    </main>
  );
}

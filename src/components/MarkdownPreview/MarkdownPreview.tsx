import styles from './MarkdownPreview.module.css';

interface MarkdownPreviewProps {
  content: string;
  onCopy: () => void;
}

export default function MarkdownPreview({ content, onCopy }: MarkdownPreviewProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>README.md Preview</span>
        <button onClick={onCopy} className={styles.copyButton}>
          Copiar Markdown
        </button>
      </div>
      <div className={styles.preview}>
        {content.split('\n').map((line, index) => {
          if (line.startsWith('# ')) return <h1 key={index}>{line.replace('# ', '')}</h1>;
          if (line.startsWith('## ')) return <h2 key={index}>{line.replace('## ', '')}</h2>;
          if (line.startsWith('- ')) return <li key={index}>{line.replace('- ', '')}</li>;
          if (line.trim() === '') return <br key={index} />;
          return <p key={index}>{line}</p>;
        })}
      </div>
    </div>
  );
}

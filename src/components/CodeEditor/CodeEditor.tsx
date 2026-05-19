import styles from './CodeEditor.module.css';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="code-input" className={styles.label}>Código Fonte</label>
      <textarea
        id="code-input"
        className={styles.textarea}
        placeholder="Cole seu código aqui (JS, TS ou Python)..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}

import styles from './LinguagemSelector.module.css';

interface LinguagemSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const languages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
];

export default function LinguagemSelector({ value, onChange }: LinguagemSelectorProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="lang-select" className={styles.label}>Linguagem</label>
      <select
        id="lang-select"
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

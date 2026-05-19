import styles from './DocPanel.module.css';

interface DocPanelProps {
  summary: string;
  functions: string[];
}

export default function DocPanel({ summary, functions }: DocPanelProps) {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h3 className={styles.title}>Resumo da Lógica</h3>
        <p className={styles.text}>{summary}</p>
      </section>
      
      {functions && functions.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.title}>Funções Detectadas</h3>
          <ul className={styles.list}>
            {functions.map((func, index) => (
              <li key={index} className={styles.listItem}>
                <code>{func}</code>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

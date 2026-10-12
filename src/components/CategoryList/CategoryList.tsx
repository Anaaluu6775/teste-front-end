import styles from './CategoryList.module.scss';

interface Category {
  name: string;
  icon: string;
  current?: boolean;
}

const CATEGORIES: Category[] = [
  { name: 'Tecnologia', icon: 'tecnologia.png', current: true },
  { name: 'Supermercado', icon: 'supermercado.png' },
  { name: 'Bebidas', icon: 'bebidas.png' },
  { name: 'Ferramentas', icon: 'ferramentas.png' },
  { name: 'Saúde', icon: 'saude.png' },
  { name: 'Esportes e Fitness', icon: 'esportes-e-fitness.png' },
  { name: 'Moda', icon: 'moda.png' },
];

export function CategoryList() {
  return (
    <nav className={styles.wrapper} aria-label="Departamentos">
      <ul className={styles.list}>
        {CATEGORIES.map(({ name, icon, current }) => (
          <li key={name}>
            <a
              className={`${styles.item} ${current ? styles.current : ''}`}
              href="#produtos"
              aria-current={current ? 'true' : undefined}
            >
              <span className={styles.card}>
                <img src={`/images/categorias/${icon}`} alt="" width={61} height={61} />
              </span>
              <span className={styles.name}>{name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

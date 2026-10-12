import styles from './Brands.module.scss';

export function Brands() {
  return (
    <section className={styles.wrapper} aria-labelledby="marcas-title">
      <h2 id="marcas-title" className={styles.title}>
        Navegue por marcas
      </h2>
      <ul className={styles.list}>
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i}>
            <a className={styles.brand} href="#produtos" aria-label={`Marca ${i + 1}`}>
              <img src="/images/logo.png" alt="" width={139} height={42} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
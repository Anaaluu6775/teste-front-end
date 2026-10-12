import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.content}>
        <p className={styles.offer}>50% Off nos produtos</p>
        <h1 id="hero-title" className={styles.title}>
          Venha conhecer nossas promoções
        </h1>
        <a className={styles.cta} href="#produtos">
          Ver produto
        </a>
      </div>
    </section>
  );
}

import styles from './PartnerBanners.module.scss';

export function PartnerBanners() {
  return (
    <section className={styles.wrapper} aria-label="Parceiros">
      {[1, 2].map((n) => (
        <article key={n} className={styles.banner}>
          <h2 className={styles.title}>Parceiros</h2>
          <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur</p>
          <a className={styles.cta} href="#produtos">
            Confira
          </a>
        </article>
      ))}
    </section>
  );
}

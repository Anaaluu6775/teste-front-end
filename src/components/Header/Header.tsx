import type { ReactNode } from 'react';
import styles from './Header.module.scss';

const BENEFITS: { icon: ReactNode; text: ReactNode }[] = [
  {
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    text: (
      <>
        Compra <strong>100% segura</strong>
      </>
    ),
  },
  {
    icon: (
      <>
        <path d="M3 6h11v10H3z" />
        <path d="M14 9h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="17" cy="18" r="1.6" />
      </>
    ),
    text: (
      <>
        <strong>Frete grátis</strong> acima de R$ 200
      </>
    ),
  },
  {
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    text: (
      <>
        <strong>Parcele</strong> suas compras
      </>
    ),
  },
];

const CROWN = <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" />;

const CATEGORIES: { name: string; highlight?: boolean; icon?: ReactNode }[] = [
  { name: 'Todas Categorias' },
  { name: 'Supermercado' },
  { name: 'Livros' },
  { name: 'Moda' },
  { name: 'Lançamentos' },
  { name: 'Ofertas do dia', highlight: true },
  { name: 'Assinatura', icon: CROWN },
];

const ACTIONS: { label: string; icon: ReactNode }[] = [
  {
    label: 'Meus pedidos',
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 9h16" />
        <path d="M15 14.5H9m0 0 2.5-2.5M9 14.5l2.5 2.5" />
      </>
    ),
  },
  {
    label: 'Favoritos',
    icon: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  },
  {
    label: 'Minha conta',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="10" r="3" />
        <path d="M6.2 18.2a7 7 0 0 1 11.6 0" />
      </>
    ),
  },
  {
    label: 'Carrinho',
    icon: (
      <>
        <path d="M3 4h2l2.2 10.2a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.78L19.5 8H6.2" />
        <circle cx="9" cy="19" r="1.3" />
        <circle cx="17" cy="19" r="1.3" />
      </>
    ),
  },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <ul className={styles.benefits}>
          {BENEFITS.map(({ icon, text }, index) => (
            <li key={index} className={styles.benefit}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {icon}
              </svg>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bar}>
        <a className={styles.logo} href="/">
          <img src="/images/logo.png" alt="Econverse, página inicial" width={139} height={42} />
        </a>

        <form className={styles.search} role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="busca" className={styles.srOnly}>
            O que você está buscando?
          </label>
          <input id="busca" type="search" placeholder="O que você está buscando?" />
          <button type="submit" aria-label="Buscar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </form>

        <ul className={styles.actions}>
          {ACTIONS.map(({ label, icon }) => (
            <li key={label}>
              <button type="button" className={styles.action} aria-label={label}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icon}
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <nav className={styles.nav} aria-label="Categorias">
        <ul>
          {CATEGORIES.map(({ name, highlight, icon }) => (
            <li key={name}>
              <a className={highlight ? styles.highlight : undefined} href="#produtos">
                {icon && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {icon}
                  </svg>
                )}
                {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
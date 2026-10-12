import type { ReactNode } from 'react';
import styles from './Footer.module.scss';

const COLUMNS = [
  { title: 'Institucional', links: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'] },
  { title: 'Ajuda', links: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'] },
  { title: 'Termos', links: ['Termos e Condições', 'Política de Privacidade', 'Troca e Devolução'] },
];

const SOCIALS: { label: string; icon: ReactNode }[] = [
  {
    label: 'Instagram',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
      </>
    ),
  },
  {
    label: 'Facebook',
    icon: (
      <path d="M14.5 21v-8h2.7l.5-3.2h-3.2V7.9c0-.9.4-1.5 1.6-1.5h1.7V3.6c-.4-.1-1.3-.2-2.3-.2-2.5 0-4.1 1.5-4.1 4.1v2.3H8.8V13h2.6v8z" />
    ),
  },
  {
    label: 'LinkedIn',
    icon: (
      <>
        <circle cx="5" cy="5.2" r="1.7" />
        <path d="M3.3 9.3h3.4V21H3.3z" />
        <path d="M9.5 9.3h3.2v1.6c.6-1.1 1.8-1.9 3.5-1.9 3 0 3.8 2 3.8 4.6V21h-3.4v-6.4c0-1.4-.4-2.4-1.7-2.4s-2.1 1-2.1 2.4V21H9.5z" />
      </>
    ),
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.inner}>
          <div className={styles.about}>
            <img
              className={styles.logo}
              src="/images/logo.png"
              alt="Econverse"
              width={139}
              height={42}
            />
            <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

            <ul className={styles.socials}>
              {SOCIALS.map(({ label, icon }) => (
                <li key={label}>
                  <a className={styles.social} href="#produtos" aria-label={label}>
                    <svg
                      width="24"
                      height="24"
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
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.columns}>
            {COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className={styles.heading}>{column.title}</h2>
                <ul className={styles.links}>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#produtos">{link}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </footer>
  );
}
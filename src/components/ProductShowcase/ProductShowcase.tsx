import { useId, useRef, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import type { Product } from '../../types/product';
import styles from './ProductShowcase.module.scss';

interface ProductShowcaseProps {
  title: string;
  products: Product[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onSelect: (product: Product) => void;
  tabs?: string[];
  sectionId?: string;
}

export function ProductShowcase({
  title,
  products,
  loading,
  error,
  onRetry,
  onSelect,
  tabs,
  sectionId,
}: ProductShowcaseProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const titleId = useId();
  const [activeTab, setActiveTab] = useState(0);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
  };

  const renderBody = () => {
    if (loading) {
      return (
        <div className={styles.skeletons} role="status" aria-live="polite">
          <span className={styles.srOnly}>Carregando produtos…</span>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className={styles.skeleton} aria-hidden="true" />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.feedback} role="alert">
          <p>{error}</p>
          <button type="button" className={styles.retry} onClick={onRetry}>
            Tentar novamente
          </button>
        </div>
      );
    }

    if (products.length === 0) {
      return <p className={styles.feedback}>Nenhum produto disponível no momento.</p>;
    }

    return (
      <div className={styles.carousel}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.prev}`}
          onClick={() => scroll(-1)}
          aria-label="Ver produtos anteriores"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <ul className={styles.track} ref={trackRef}>
          {products.map((product, index) => (
            <li key={`${product.productName}-${index}`} className={styles.item}>
              <ProductCard product={product} onSelect={onSelect} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`${styles.arrow} ${styles.next}`}
          onClick={() => scroll(1)}
          aria-label="Ver próximos produtos"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    );
  };

  return (
    <section id={sectionId} className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>

      {tabs ? (
        <div className={styles.tabs} role="group" aria-label="Categorias de produtos">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`${styles.tab} ${index === activeTab ? styles.tabActive : ''}`}
              aria-pressed={index === activeTab}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
          <a className={styles.seeAll} href="#produtos">
            Ver todos
          </a>
        </div>
      ) : (
        <a className={`${styles.seeAll} ${styles.seeAllRight}`} href="#produtos">
          Ver todos
        </a>
      )}

      {renderBody()}
    </section>
  );
}

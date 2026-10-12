import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatPrice';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.info}
        onClick={() => onSelect(product)}
        aria-haspopup="dialog"
      >
        <span className={styles.imageWrap}>
          <img
            className={styles.image}
            src={product.photo}
            alt={product.productName}
            width={160}
            height={160}
            loading="lazy"
          />
        </span>
        <h3 className={styles.name}>{product.productName}</h3>
        <span className={styles.price}>{formatPrice(product.price)}</span>
        <span className={styles.installment}>
          ou 2x de {formatPrice(product.price / 2)} sem juros
        </span>
        <span className={styles.shipping}>Frete grátis</span>
      </button>

      <button type="button" className={styles.buy} onClick={() => onSelect(product)}>
        Comprar
      </button>
    </article>
  );
}

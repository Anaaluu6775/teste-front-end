import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatPrice';
import styles from './ProductModal.module.scss';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialog) return;

      const items = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
          <span aria-hidden="true">×</span>
        </button>

        <div className={styles.imageWrap}>
          <img className={styles.image} src={product.photo} alt={product.productName} />
        </div>

        <div className={styles.info}>
          <h2 id={titleId} className={styles.title}>
            {product.productName}
          </h2>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p id={descId} className={styles.description}>
            {product.descriptionShort}
          </p>
          <button type="button" className={styles.more}>
            Veja mais detalhes do produto &gt;
          </button>

          <div className={styles.actions}>
            <div className={styles.quantity} role="group" aria-label="Quantidade">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <output aria-live="polite">{String(quantity).padStart(2, '0')}</output>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              >
                +
              </button>
            </div>
            <button type="button" className={styles.buy}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

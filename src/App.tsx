import { useCallback, useState } from 'react';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { CategoryList } from './components/CategoryList/CategoryList';
import { ProductShowcase } from './components/ProductShowcase/ProductShowcase';
import { PartnerBanners } from './components/PartnerBanners/PartnerBanners';
import { Brands } from './components/Brands/Brands';
import { Newsletter } from './components/Newsletter/Newsletter';
import { Footer } from './components/Footer/Footer';
import { ProductModal } from './components/ProductModal/ProductModal';
import { useProducts } from './hooks/useProducts';
import type { Product } from './types/product';

const TABS = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs'];

export default function App() {
  const { products, loading, error, retry } = useProducts();
  const [selected, setSelected] = useState<Product | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const showcaseProps = { products, loading, error, onRetry: retry, onSelect: setSelected };

  return (
    <>
      <Header />

      <main>
        <Hero />
        <CategoryList />

        <ProductShowcase
          sectionId="produtos"
          title="Produtos relacionados"
          tabs={TABS}
          {...showcaseProps}
        />
        <PartnerBanners />
        <ProductShowcase title="Produtos relacionados" {...showcaseProps} />
        <PartnerBanners />
        <Brands />
        <ProductShowcase title="Produtos relacionados" {...showcaseProps} />
      </main>

      <Newsletter />
      <Footer />

      {selected && <ProductModal product={selected} onClose={closeModal} />}
    </>
  );
}

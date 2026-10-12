import { useCallback, useEffect, useState } from 'react';
import type { Product, ProductsResponse } from '../types/product';

const DEFAULT_URL =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json';
const PRODUCTS_URL: string = import.meta.env.VITE_PRODUCTS_URL || DEFAULT_URL;
// Cópia local do mesmo JSON, usada se a URL oficial falhar (ex.: CORS ou fora do ar).
const FALLBACK_URL = '/products.json';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

async function requestProducts(url: string, signal: AbortSignal): Promise<Product[]> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Erro ${res.status} ao buscar os produtos.`);

  const data = (await res.json()) as ProductsResponse;
  if (!data.success || !Array.isArray(data.products)) {
    throw new Error('Resposta inesperada da API de produtos.');
  }
  return data.products;
}

const isAbort = (err: unknown) => err instanceof DOMException && err.name === 'AbortError';

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        try {
          setProducts(await requestProducts(PRODUCTS_URL, controller.signal));
        } catch (err) {
          if (isAbort(err)) throw err;
          setProducts(await requestProducts(FALLBACK_URL, controller.signal));
        }
      } catch (err) {
        if (isAbort(err)) return;
        setError(err instanceof Error ? err.message : 'Não foi possível carregar os produtos.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    void load();
    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { products, loading, error, retry };
}
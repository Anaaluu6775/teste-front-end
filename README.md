# Econverse | Vitrine de Produtos

Teste para a vaga de Desenvolvedor Front-End. Vitrine de produtos com modal de detalhes, feita com React + TypeScript + Sass, sem bibliotecas de UI.

## Tecnologias

- React 18 + TypeScript
- Vite
- Sass (CSS Modules com `.module.scss`)
- Vitest
- Testing Library

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Como rodar

```bash
# 1. instalar dependências
npm install

# 2. subir o servidor de desenvolvimento
npm run dev
```

Acesse o endereço mostrado no terminal (geralmente `http://localhost:5173`).

## Como compilar

```bash
npm run build     # checa os tipos (TypeScript) e gera o build em dist/
npm run preview   # serve o build de produção localmente
```

## Como testar

1. Rode `npm test` para executar os testes automatizados (formatação de preço e modal de produto).
2. Rode `npm run build`. Ele falha se houver erro de tipos ou de compilação.
3. Rode `npm run dev` e confira no navegador:
   - os produtos aparecem nas três vitrines, com preço, parcelamento e botão Comprar;
   - clicar em um produto abre o modal com as informações dele;
   - o modal fecha com a tecla ESC, com o botão × e clicando fora dele;
   - ao diminuir a janela, o layout se adapta (4, 3, 2 colunas e scroll horizontal no mobile).

## Fonte dos produtos

A vitrine consome o JSON oficial do teste:

https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json

Se essa URL falhar (por exemplo, por CORS ou indisponibilidade), a aplicação usa a cópia local `public/products.json`, com o mesmo conteúdo. Para apontar para outra URL, crie um arquivo `.env` na raiz com `VITE_PRODUCTS_URL=<url>`.

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checagem de tipos e build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm test` | Roda os testes uma vez |
| `npm run test:watch` | Roda os testes em modo watch |

## Estrutura

```
src/
  components/
    Header, Hero, CategoryList, PartnerBanners, Brands, Newsletter, Footer
    ProductCard/       Card do produto (preço, parcelamento, frete, comprar)
    ProductShowcase/   Vitrine (carrossel), abas, estados de loading, erro e vazio
    ProductModal/      Modal acessível (preço, descrição, quantidade, comprar)
  hooks/useProducts.ts Busca e estado dos produtos
  types/product.ts     Tipos do JSON
  utils/formatPrice.ts Formatação em BRL
  styles/              Variáveis, mixins e estilos globais (Sass)
```

## Layout

A página segue o layout do Figma do teste: header (benefícios, busca e categorias), banner, departamentos, três vitrines de produtos, banners de parceiros, marcas, newsletter e rodapé. A vitrine e o modal consomem o JSON de produtos. As abas da vitrine são visuais, pois o JSON não traz categoria.

## Decisões

- **Modal acessível**: `role="dialog"`, `aria-modal`, foco preso, fecha com ESC, clique no overlay ou botão, devolve o foco ao card.
- **HTML semântico**: `header`, `main`, `section`, `article`, `ul/li`, hierarquia `h1 > h2/h3`, `alt` nas imagens.
- **SEO**: `lang="pt-BR"`, `title`, `meta description` e Open Graph no `index.html`.
- **Responsivo**: 4, 3, 2 colunas e scroll horizontal no mobile.
- **Design tokens**: cores, fontes e espaçamentos em `src/styles/_variables.scss`.
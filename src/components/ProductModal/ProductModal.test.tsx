import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductModal } from './ProductModal';

const product = {
  productName: 'IPHONE 13 MINI 1',
  descriptionShort: 'Descrição curta',
  photo: 'https://example.com/foto.png',
  price: 9000,
};

describe('ProductModal', () => {
  it('exibe as informações do produto', () => {
    render(<ProductModal product={product} onClose={() => {}} />);
    expect(screen.getByRole('dialog', { name: 'IPHONE 13 MINI 1' })).toBeInTheDocument();
    expect(screen.getByText('Descrição curta')).toBeInTheDocument();
    expect(screen.getByAltText('IPHONE 13 MINI 1')).toBeInTheDocument();
  });

  it('fecha com ESC e pelo botão', async () => {
    const onClose = vi.fn();
    render(<ProductModal product={product} onClose={onClose} />);
    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});

import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('formata valores em reais', () => {
    expect(formatPrice(15000).replace(/\s/g, ' ')).toBe('R$ 15.000,00');
    expect(formatPrice(520).replace(/\s/g, ' ')).toBe('R$ 520,00');
  });
});

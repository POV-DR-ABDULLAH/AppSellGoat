export const formatIDR = (value) => {
    try {
      const num = Number(value) || 0;
      return new Intl.NumberFormat('id-ID').format(num);
    } catch {
      return String(value);
    }
  };
  
  export const formatCurrencyIDR = (value) => `Rp ${formatIDR(value)}`;
  
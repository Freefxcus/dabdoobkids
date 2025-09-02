export function mapUiToDtoMethod(ui) {
  const key = String(ui || '').toUpperCase();
  const map = {
    COD: 'COD',
    CARD: 'Card',      // adjust to your enum if needed
    WALLET: 'EWallet', // REQUIRED to match DTO's ValidateIf
    VALU: 'ValU',
    KIOSK: 'Kiosk',
  };
  return map[key] || 'COD';
}
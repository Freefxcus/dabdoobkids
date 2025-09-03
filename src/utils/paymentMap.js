// Map UI values -> backend enum strings
// UI can keep using 'COD' | 'CARD' | 'WALLET'
export function mapUiToDtoMethod(ui) {
  const key = String(ui || "").toUpperCase();
  switch (key) {
    case "COD":
      return "Cash on Delivery";
    case "CARD":
      return "Credit Card";
    case "WALLET":
      return "E-Wallet";
    case "VALU": return "ValU";
    case "KIOSK": return "Kiosk";
    default:
      return "Cash on Delivery";
  }
}

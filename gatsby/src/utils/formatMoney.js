const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function formatMoney(priceInCents) {
  return formatter.format(priceInCents / 100);
}

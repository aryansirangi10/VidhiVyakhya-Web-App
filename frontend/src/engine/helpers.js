export function formatRupee(value) {
  if (value === undefined || value === null) return '₹0';
  const isNegative = value < 0;
  const absVal = Math.abs(value);
  const formatted = absVal.toLocaleString('en-IN');
  return `${isNegative ? '-' : ''}₹${formatted}`;
}

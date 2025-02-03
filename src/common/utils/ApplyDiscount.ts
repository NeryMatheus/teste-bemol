export function ApplyDiscount(
  discountCode: string,
  totalAmount: number
): number | null {
  const discount = discountCode
    ? parseFloat(discountCode.replace(/\D/g, '')) / 100
    : 0;

  const totalAmountWithDiscount = totalAmount - totalAmount * discount;

  return Math.trunc(totalAmountWithDiscount * 100) / 100;
}

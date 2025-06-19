// export const calCulateDiscountPercentage = (
//   oldPrice: number,
//   newPrice: number
// ) => {
//   if (oldPrice <= newPrice) return 0;
//   return Math.floor(((oldPrice - newPrice) / oldPrice) * 100);
// };

export const calculateDiscountPercentage = (
  price: number, // discounted price
  discount: number, // amount reduced from original
) => {
  if (price <= 0 || discount <= 0)
    return { discountPercentage: 0, discountPrice: price };

  const discountPrice = price - discount;
  const discountPercentage = Math.floor((discount * 100) / price);

  return {
    discountPercentage,
    discountPrice,
  };
};

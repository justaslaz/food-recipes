export const calcIngredientQuantity = (
  quantity: number,
  initServingSize: number,
  curServingSize: number
) => {
  if (quantity === 0) return "";
  const result = (quantity / initServingSize) * curServingSize;
  return result;
};

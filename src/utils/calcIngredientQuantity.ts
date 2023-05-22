export const calcIngredientQuantity = (
  quantity: number,
  initServingSize: number,
  curServingSize: number
) => {
  return (quantity / initServingSize) * curServingSize;
};

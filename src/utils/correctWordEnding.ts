// helper function - correct lithuanian single/plural word
export const correctWordEnding = (quantity: number) => {
  if (quantity >= 11 && quantity <= 19) return 'ų';

  const endNumberValue = Number(quantity.toString().at(-1));

  if (endNumberValue === 0) return 'ų';
  if (endNumberValue === 1) return 'a';
  if (endNumberValue >= 2 && endNumberValue <= 9) return 'os';
};

export const findLast = (pred, xs) =>
  xs
    .slice()
    .reverse()
    .find(pred);

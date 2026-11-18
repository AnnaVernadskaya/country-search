export const debounce: <Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
) => (...args: Args) => void = () => () => {};

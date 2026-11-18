export const createSearchController: (
  onStateChange: (state: unknown) => void,
) => {
  updateQuery: (query: string) => void;
} = () => ({
  updateQuery: () => {},
});

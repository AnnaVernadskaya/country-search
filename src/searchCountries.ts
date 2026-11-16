export async function searchCountries(
  query: string,
  signal: AbortSignal,
): Promise<unknown[]> {
  const url = `https://countries.dev/name/${encodeURIComponent(query)}`;
  const response = await fetch(url, { signal });
  const countries: unknown[] = await response.json();

  return countries;
}

import type { RawCountry } from "./mapCountryResponse.js";

export async function searchCountries(
  query: string,
  signal: AbortSignal,
): Promise<RawCountry[]> {
  const url = `https://countries.dev/name/${encodeURIComponent(query)}`;
  const response = await fetch(url, { signal });
  const countries: RawCountry[] = await response.json();

  return countries;
}

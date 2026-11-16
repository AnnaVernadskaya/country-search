export type RawCountry = {
  name: string;
  flags: { svg: string };
  capital: string;
  region: string;
  population: number;
  languages: { name: string }[];
};

export function mapCountryResponse(raw: RawCountry) {
  return {
    name: raw.name,
    flagUrl: raw.flags.svg,
    capital: raw.capital,
    region: raw.region,
    population: raw.population,
    languages: raw.languages.map((language) => language.name),
  };
}

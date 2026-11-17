export function mapCountryResponse(raw) {
    return {
        name: raw.name,
        flagUrl: raw.flags.svg,
        capital: raw.capital,
        region: raw.region,
        population: raw.population,
        languages: raw.languages.map((language) => language.name),
    };
}

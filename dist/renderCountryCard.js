export function renderCountryCard(country) {
    const card = document.createElement("article");
    card.className = "country-card";
    const header = document.createElement("header");
    header.className = "country-card__header";
    const flag = document.createElement("img");
    flag.className = "country-card__flag";
    flag.src = country.flagUrl;
    flag.alt = "";
    flag.width = 32;
    flag.height = 22;
    const title = document.createElement("h2");
    title.textContent = country.name;
    header.append(flag, title);
    const details = document.createElement("dl");
    details.className = "country-card__details";
    const fields = [
        ["Capital", country.capital],
        ["Region", country.region],
        ["Population", country.population.toLocaleString("en-US")],
    ];
    for (const [label, value] of fields) {
        const term = document.createElement("dt");
        term.textContent = label;
        const description = document.createElement("dd");
        description.textContent = value;
        details.append(term, description);
    }
    card.append(header, details);
    return card;
}

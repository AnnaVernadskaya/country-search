import { renderCountryCard } from "./renderCountryCard.js";

const main = document.createElement("main");
main.className = "search-screen";

const panel = document.createElement("div");
panel.className = "search-panel";

const title = document.createElement("h1");
title.textContent = "Country Search";

const label = document.createElement("label");
label.htmlFor = "country-search";
label.textContent = "Search for a country";

const input = document.createElement("input");
input.id = "country-search";
input.type = "search";
input.placeholder = "e.g. Spain";

const results = document.createElement("div");
results.className = "search-results";

panel.append(title, label, input, results);
main.append(panel);
document.body.append(main);

results.append(
  renderCountryCard({
    name: "Spain",
    flag: "🇪🇸",
    capital: "Madrid",
    region: "Europe",
    population: 47_000_000,
  }),
);

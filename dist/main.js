import { renderCountryCard } from "./renderCountryCard.js";
import { mapCountryResponse } from "./mapCountryResponse.js";
import { searchCountries } from "./searchCountries.js";
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
input.addEventListener("keydown", async (event) => {
    if (event.key !== "Enter")
        return;
    const query = input.value.trim();
    if (!query) {
        results.replaceChildren();
        return;
    }
    const loading = document.createElement("p");
    loading.setAttribute("role", "status");
    loading.textContent = "Loading…";
    results.replaceChildren(loading);
    const { signal } = new AbortController();
    try {
        const countries = await searchCountries(query, signal);
        const cards = countries.map((country) => renderCountryCard(mapCountryResponse(country)));
        results.replaceChildren(...cards);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        loading.remove();
    }
});

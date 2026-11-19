import { renderCountryCard } from "./renderCountryCard.js";
import { mapCountryResponse } from "./mapCountryResponse.js";
import { createSearchController } from "./searchController.js";
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
const controller = createSearchController((state) => {
    results.replaceChildren();
    if (state.status === "idle")
        return;
    if (state.status === "loading") {
        const loading = document.createElement("p");
        loading.setAttribute("role", "status");
        loading.textContent = "Loading…";
        results.append(loading);
        return;
    }
    if (state.status === "error") {
        const message = document.createElement("p");
        message.setAttribute("role", "alert");
        message.textContent = state.message;
        const retry = document.createElement("button");
        retry.type = "button";
        retry.textContent = "Retry";
        retry.addEventListener("click", () => {
            controller.retry();
        });
        results.append(message, retry);
        return;
    }
    if (state.countries.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.setAttribute("role", "status");
        emptyMessage.textContent = "No countries found.";
        results.append(emptyMessage);
        return;
    }
    const cards = state.countries.map((country) => renderCountryCard(mapCountryResponse(country)));
    results.append(...cards);
});
input.addEventListener("input", () => {
    controller.updateQuery(input.value);
});

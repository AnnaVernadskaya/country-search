import { renderCountryCard } from "./renderCountryCard.js";
import { mapCountryResponse } from "./mapCountryResponse.js";
import { searchCountries } from "./searchCountries.js";
import { getSearchErrorMessage } from "./getSearchErrorMessage.js";

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

async function runSearch(query: string): Promise<void> {
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

    if (countries.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = "No countries found.";
      results.replaceChildren(emptyMessage);
      return;
    }

    const cards = countries.map((country) =>
      renderCountryCard(mapCountryResponse(country)),
    );
    results.replaceChildren(...cards);
  } catch (error) {
    const message = getSearchErrorMessage(error);
    if (message === null) return;

    const errorMessage = document.createElement("p");
    errorMessage.setAttribute("role", "alert");
    errorMessage.textContent = message;

    const retry = document.createElement("button");
    retry.type = "button";
    retry.textContent = "Retry";
    retry.addEventListener("click", () => {
      void runSearch(input.value.trim());
    });

    results.replaceChildren(errorMessage, retry);
  } finally {
    loading.remove();
  }
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    void runSearch(input.value.trim());
  }
});

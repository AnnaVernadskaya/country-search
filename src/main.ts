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

panel.append(title, label, input);
main.append(panel);
document.body.append(main);

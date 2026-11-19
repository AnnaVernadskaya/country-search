import { expect, it } from "vitest";
import { mapCountryResponse } from "../src/mapCountryResponse.ts";

it("maps an API response to country card data", () => {
  const raw = {
    name: "Spain",
    flags: {
      svg: "https://flagcdn.com/es.svg",
    },
    capital: "Madrid",
    region: "Europe",
    population: 47_351_567,
    languages: [{ name: "Spanish", iso639_1: "es" }],
  };

  expect(mapCountryResponse(raw)).toEqual({
    name: "Spain",
    flagUrl: "https://flagcdn.com/es.svg",
    capital: "Madrid",
    region: "Europe",
    population: 47_351_567,
    languages: ["Spanish"],
  });
});

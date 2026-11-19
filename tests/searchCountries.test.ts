import { afterEach, expect, it, vi } from "vitest";
import { searchCountries } from "../src/searchCountries.js";

afterEach(() => {
  vi.unstubAllGlobals();
});

it("fetches and returns countries matching the query", async () => {
  const countries = [
    {
      name: "Spain",
      capital: "Madrid",
      region: "Europe",
      population: 47_351_567,
      flags: { svg: "https://flagcdn.com/es.svg" },
    },
  ];

  const fetchMock = vi
    .fn()
    .mockResolvedValue(
      new Response(JSON.stringify(countries), { status: 200 }),
    );
  vi.stubGlobal("fetch", fetchMock);

  const { signal } = new AbortController();
  const result = await searchCountries("Spain", signal);

  expect(result).toEqual(countries);
  expect(fetchMock).toHaveBeenCalledWith(
    "https://countries.dev/name/Spain",
    expect.objectContaining({ signal }),
  );
});

it("returns an empty array when no countries match", async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValue(new Response("Country not found", { status: 404 }));
  vi.stubGlobal("fetch", fetchMock);

  const { signal } = new AbortController();

  await expect(searchCountries("zzzzzzzz", signal)).resolves.toEqual([]);
});

it("throws HttpError for an unsuccessful response other than 404", async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValue(new Response("Internal Server Error", { status: 500 }));
  vi.stubGlobal("fetch", fetchMock);

  const { signal } = new AbortController();

  await expect(searchCountries("Spain", signal)).rejects.toMatchObject({
    name: "HttpError",
    status: 500,
  });
});

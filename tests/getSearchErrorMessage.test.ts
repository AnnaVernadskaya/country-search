import { expect, it } from "vitest";
import { getSearchErrorMessage } from "../src/getSearchErrorMessage.ts";

it("shows no error message when a search is cancelled", () => {
  const error = new DOMException("Search cancelled", "AbortError");

  expect(getSearchErrorMessage(error)).toBeNull();
});

it("shows a timeout message when the request takes too long", () => {
  const error = new DOMException("Request timed out", "TimeoutError");

  expect(getSearchErrorMessage(error)).toBe("The search timed out. Try again.");
});

it("shows an error message when the network request fails", () => {
  const error = new TypeError("Failed to fetch");

  expect(getSearchErrorMessage(error)).toBe(
    "Could not load countries. Try again.",
  );
});

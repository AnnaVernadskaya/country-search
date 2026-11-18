import { afterEach, expect, it, vi } from "vitest";
import { searchCountries } from "../src/searchCountries.js";
import { createSearchController } from "../src/searchController.js";

vi.mock("../src/searchCountries.js", () => ({
  searchCountries: vi.fn(),
}));

afterEach(() => {
  vi.useRealTimers();
  vi.resetAllMocks();
});

it("aborts the active request immediately when the query changes", () => {
  vi.useFakeTimers();

  const searchMock = vi.mocked(searchCountries);

  searchMock.mockImplementation(() => new Promise(() => {}));

  const controller = createSearchController(vi.fn());

  controller.updateQuery("sp");
  vi.advanceTimersByTime(300);

  expect(searchMock).toHaveBeenCalledTimes(1);

  const firstSignal = searchMock.mock.calls[0]![1];
  expect(firstSignal.aborted).toBe(false);

  controller.updateQuery("spain");

  expect(firstSignal.aborted).toBe(true);
  expect(searchMock).toHaveBeenCalledTimes(1);
});

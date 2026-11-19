import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { debounce } from "../src/debounce.ts";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it("calls the callback after the delay", () => {
  const callback = vi.fn();
  const debounced = debounce(callback, 300);

  debounced("Spain");

  vi.advanceTimersByTime(299);
  expect(callback).not.toHaveBeenCalled();

  vi.advanceTimersByTime(1);
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith("Spain");
});

it("restarts the delay when the query changes", () => {
  const callback = vi.fn();
  const debounced = debounce(callback, 300);

  debounced("sp");
  vi.advanceTimersByTime(100);
  debounced("spain");

  vi.advanceTimersByTime(299);
  expect(callback).not.toHaveBeenCalled();

  vi.advanceTimersByTime(1);
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith("spain");
});

export function getSearchErrorMessage(error: unknown): string | null {
  if (error instanceof DOMException && error.name === "AbortError") {
    return null;
  }

  if (error instanceof DOMException && error.name === "TimeoutError") {
    return "The search timed out. Try again.";
  }

  return "Could not load countries. Try again.";
}

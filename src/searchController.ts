import { debounce } from "./debounce.js";
import { searchCountries } from "./searchCountries.js";
import { getSearchErrorMessage } from "./getSearchErrorMessage.js";
import type { RawCountry } from "./mapCountryResponse.js";

export type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; countries: RawCountry[] }
  | { status: "error"; message: string };

export function createSearchController(
  onStateChange: (state: SearchState) => void,
) {
  let activeController: AbortController | undefined;
  let latestQuery = "";

  async function runSearch(
    query: string,
    controller: AbortController,
  ): Promise<void> {
    if (controller.signal.aborted) return;

    onStateChange({ status: "loading" });

    try {
      const countries = await searchCountries(query, controller.signal);

      if (controller.signal.aborted) return;

      onStateChange({ status: "success", countries });
    } catch (error) {
      if (controller.signal.aborted) return;

      const message = getSearchErrorMessage(error);

      if (message !== null) {
        onStateChange({ status: "error", message });
      }
    }
  }

  const delayedSearch = debounce(
    (query: string, controller: AbortController) => {
      void runSearch(query, controller);
    },
    300,
  );

  function updateQuery(query: string): void {
    activeController?.abort();
    latestQuery = query.trim();
    onStateChange({ status: "idle" });

    if (!latestQuery) {
      activeController = undefined;
      return;
    }

    activeController = new AbortController();
    delayedSearch(latestQuery, activeController);
  }

  function retry(): void {
    activeController?.abort();

    if (!latestQuery) return;

    activeController = new AbortController();
    void runSearch(latestQuery, activeController);
  }

  return { updateQuery, retry };
}

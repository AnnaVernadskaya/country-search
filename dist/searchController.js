import { debounce } from "./debounce.js";
import { searchCountries } from "./searchCountries.js";
import { getSearchErrorMessage } from "./getSearchErrorMessage.js";
export function createSearchController(onStateChange) {
    let activeController;
    let latestQuery = "";
    async function runSearch(query, controller) {
        if (controller.signal.aborted)
            return;
        onStateChange({ status: "loading" });
        try {
            const countries = await searchCountries(query, controller.signal);
            if (controller.signal.aborted)
                return;
            onStateChange({ status: "success", countries });
        }
        catch (error) {
            if (controller.signal.aborted)
                return;
            const message = getSearchErrorMessage(error);
            if (message !== null) {
                onStateChange({ status: "error", message });
            }
        }
    }
    const delayedSearch = debounce((query, controller) => {
        void runSearch(query, controller);
    }, 300);
    function updateQuery(query) {
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
    function retry() {
        activeController?.abort();
        if (!latestQuery)
            return;
        activeController = new AbortController();
        void runSearch(latestQuery, activeController);
    }
    return { updateQuery, retry };
}

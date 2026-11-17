export class HttpError extends Error {
    status;
    constructor(status) {
        super(`Country search failed with HTTP status ${status}`);
        this.name = "HttpError";
        this.status = status;
    }
}
export async function searchCountries(query, signal) {
    const url = `https://countries.dev/name/${encodeURIComponent(query)}`;
    const response = await fetch(url, { signal });
    if (response.status === 404) {
        return [];
    }
    if (!response.ok) {
        throw new HttpError(response.status);
    }
    const countries = await response.json();
    return countries;
}

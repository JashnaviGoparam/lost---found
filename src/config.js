const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

export const API_URL = (
    configuredApiUrl ||
    (import.meta.env.DEV
        ? ""
        : "https://lost-found-backend-production-02a1.up.railway.app")
).replace(/\/+$/, "");

export async function apiRequest(path, options = {}) {
    const headers = { ...options.headers };
    const token = localStorage.getItem("token");

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    if (options.body) {
        headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers
    });
    const responseText = await response.text();
    let data;

    try {
        data = responseText ? JSON.parse(responseText) : {};
    } catch {
        if (responseText.trimStart().startsWith("<")) {
            if (response.status === 404 && path === "/api/admin/login") {
                throw new Error(
                    "Admin login is not available on the hosted backend yet. " +
                    "Deploy the latest backend to Railway, then rebuild and redeploy the frontend."
                );
            }

            throw new Error(
                `The server returned a page instead of API data (HTTP ${response.status}). ` +
                "Check the backend URL and make sure the backend is running."
            );
        }
        throw new Error(
            `The backend returned an invalid response for ${path} (HTTP ${response.status}).`
        );
    }

    if (!response.ok) {
        if (response.status === 502 && path === "/api/register") {
            throw new Error(
                "The registration server is temporarily unavailable (HTTP 502). " +
                "Your account may still have been created, so check whether you can log in before trying again. " +
                "If this continues, the backend administrator should check the Railway deployment logs."
            );
        }

        throw new Error(data.message || `Request failed (HTTP ${response.status}).`);
    }

    return data;
}

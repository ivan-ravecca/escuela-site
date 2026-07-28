import { http, HttpResponse } from "msw";

export const handlers = [
  // Base CSRF handler to support assistant-related tests.
  http.get("*/assistant/csrf-token", () => {
    return HttpResponse.json({ csrfToken: "csrf-test-token" });
  }),
];

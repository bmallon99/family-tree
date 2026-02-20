import { people as publicPeople } from "./public/people.js";

export async function loadPeople() {
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    try {
      const mod = await import("./local/people.js");
      return mod.people;
    } catch {
      console.warn("Local family not found, using default.");
    }
  }

  return publicPeople;
}

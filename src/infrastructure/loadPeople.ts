import type { RawPeople } from "../types/rawPeople.js";

export async function loadPeople(): Promise<RawPeople> {
  const paths = isLocalhost()
    ? ["data/local/people.json", "data/public/people.json"]
    : ["data/public/people.json"];

  for (const path of paths) {
    const response = await fetch(path);

    if (response.status === 404) {
      continue;
    }

    if (!response.ok) {
      throw new Error(
        `Failed to load people data from ${path}: ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (!isPeopleData(data)) {
      throw new Error(`Invalid people data format in ${path}`);
    }

    return data;
  }

  console.error("No people data file found.");
  return {};
}

function isLocalhost(): boolean {
  return (
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname)
  );
}

function isPeopleData(data: any): data is RawPeople {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  for (const value of Object.values(data)) {
    if (
      typeof value !== "object" ||
      value === null ||
      typeof (value as any).id !== "string" ||
      typeof (value as any).name !== "string" ||
      !Array.isArray((value as any).parentIds) ||
      !(value as any).parentIds.every((id: unknown) => typeof id === "string")
    ) {
      return false;
    }
  }

  return true;
}

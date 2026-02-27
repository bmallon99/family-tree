import { RawPeople } from "../types/rawPeople";

export async function loadPeople(): Promise<RawPeople> {
  let path = "data/public/people.json";

  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    path = "data/local/people.json";
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      console.error(
        `Failed to load people data from ${path}: ${response.statusText}`,
      );
      return {};
    }

    const data = await response.json();

    if (!isPeopleData(data)) {
      console.error(`Invalid people data format in ${path}`);
      return {};
    }

    return data;
  } catch (error) {
    console.error(`Error loading people data from ${path}:`, error);
    return {};
  }
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

import { loadPeople } from "../data/loadPeople.js";
import type { Person } from "../types/person.js";

export type PersonNode = Person & {
    children: PersonNode[];
}

export async function loadFamily() {
    return await loadPeople();
}

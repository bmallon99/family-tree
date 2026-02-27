import { Person } from "./person.js";
import type { RawPeople } from "../types/rawPeople.js";

export function buildFamilyGraph(raw: RawPeople): Map<string, Person> {
  const people = new Map<string, Person>();

  // Pass 1: instantiate all people
  for (const rawPerson of Object.values(raw)) {
    const person = new Person(rawPerson.id, rawPerson.name);
    people.set(person.id, person);
  }

  // Pass 2: connect parents
  for (const rawPerson of Object.values(raw)) {
    const person = people.get(rawPerson.id)!;

    for (const parentId of rawPerson.parentIds) {
      const parent = people.get(parentId);

      if (!parent) {
        throw new Error(`Parent "${parentId}" not found for "${rawPerson.id}"`);
      }

      person.addParent(parent);
    }
  }

  return people;
}

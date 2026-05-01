import { Person } from "./person.js";

export class FamilyTree {
  constructor(private people: Map<string, Person>) {}

  getRoots(): Person[] {
    return [...this.people.values()].filter((p) => p.parents.length === 0);
  }
}

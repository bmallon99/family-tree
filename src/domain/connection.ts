import { Person } from "./person.js";

export class Connection {
  p1: Person;
  p2: Person;
  relationshipType: string;

  constructor(p1: Person, p2: Person, relationshipType: string) {
    this.p1 = p1;
    this.p2 = p2;
    this.relationshipType = relationshipType;
  }
}

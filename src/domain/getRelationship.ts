import { Person } from "./person.js";

export function getRelationship(selectedPeople: Person[]): string {
  const person1 = selectedPeople[0];
  const person2 = selectedPeople[1];

  if (
    selectedPeople.length !== 2 ||
    !person1 ||
    !person2 ||
    person1.id === person2.id
  ) {
    return "N/A";
  }

  return "[relationship]";
}

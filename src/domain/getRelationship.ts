import { Person } from "./person.js";
import { findShortestPath } from "./findShortestPath.js";

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

  const shortestPath = findShortestPath(person1, person2);
  const relations = shortestPath.map((conn) => conn.relationshipType);

  if (relations.length === 1) {
    return `${person2.name} is ${person1.name}'s ${relations[0]}`;
  }

  if (arrayMatches(relations, ["parent", "child"])) {
    return `${person1.name} is ${person2.name}'s sibling`;
  }

  return "[relationship]";
}

function arrayMatches(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

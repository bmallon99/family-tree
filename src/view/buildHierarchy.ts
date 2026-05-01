import { Person } from "../domain/person.js";

export type D3Node = {
  person: Person;
  children?: D3Node[];
};

export function buildHierarchyFromRoot(root: Person): D3Node {
  return {
    person: root,
    children: root.children.map(buildHierarchyFromRoot),
  };
}

import { FamilyTree } from "../domain/familyTree.js";
import { Person } from "../domain/person.js";

export function renderIndentedFamilyTree(
  container: HTMLElement,
  familyTree: FamilyTree,
) {
  const roots = familyTree.getRoots();

  if (roots.length === 0) {
    throw new Error("No root found");
  }

  container.innerHTML = "";

  const tree = document.createElement("ul");
  tree.className = "indented-tree";

  for (const root of roots) {
    tree.appendChild(createPersonItem(root));
  }

  container.appendChild(tree);
}

function createPersonItem(person: Person): HTMLLIElement {
  const item = document.createElement("li");

  const label = document.createElement("span");
  label.textContent = person.name;
  item.appendChild(label);

  if (person.children.length > 0) {
    const children = document.createElement("ul");

    for (const child of person.children) {
      children.appendChild(createPersonItem(child));
    }

    item.appendChild(children);
  }

  return item;
}

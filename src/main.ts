import { loadPeople } from "./infrastructure/loadPeople.js";
import { buildFamilyGraph } from "./domain/buildFamilyGraph.js";
import { renderFamilyTree } from "./view/renderFamilyTree.js";
import { FamilyTree } from "./domain/familyTree.js";
import { Person } from "./domain/person.js";

async function bootstrap() {
  const people = await loadPeople();
  const family = buildFamilyGraph(people);
  const familyTree = new FamilyTree(family);

  const container = document.getElementById("app");
  if (!container) {
    throw new Error('Missing app container with id "app"');
  }

  container.innerHTML = "";

  const relationshipText = document.createElement("p");
  const treeContainer = document.createElement("div");

  container.append(relationshipText, treeContainer);

  let selectedPeople: Person[] = [];

  const updateRelationshipText = () => {
    relationshipText.textContent = getRelationshipText(selectedPeople);
  };

  updateRelationshipText();

  renderFamilyTree(treeContainer, familyTree, {
    onSelectionChange(nextSelectedPeople) {
      selectedPeople = nextSelectedPeople;
      updateRelationshipText();
    },
  });
}

function getRelationshipText(selectedPeople: Person[]): string {
  if (selectedPeople.length === 0) {
    return "Choose two people to see their relationship";
  }

  if (selectedPeople.length === 1) {
    return "Choose one more person";
  }

  return "[relationship]";
}

bootstrap();

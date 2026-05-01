import { loadPeople } from "./infrastructure/loadPeople.js";
import { buildFamilyGraph } from "./domain/buildFamilyGraph.js";
// import { renderIndentedFamilyTree } from "./view/renderIndentedTree.js";
import { renderFamilyTree } from "./view/renderFamilyTree.js";
import { FamilyTree } from "./domain/familyTree.js";

async function bootstrap() {
  const people = await loadPeople();
  const family = buildFamilyGraph(people);
  const familyTree = new FamilyTree(family);

  const container = document.getElementById("app");
  if (!container) {
    throw new Error('Missing app container with id "app"');
  }

  // renderIndentedFamilyTree(container, familyTree);
  renderFamilyTree(container, familyTree);
}

bootstrap();

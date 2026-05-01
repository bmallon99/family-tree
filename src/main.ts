import { loadPeople } from "./infrastructure/loadPeople.js";
import { buildFamilyGraph } from "./domain/buildFamilyGraph.js";
import { renderFamilyTree } from "./view/renderTree.js";
import { FamilyTree } from "./domain/familyTree.js";

async function bootstrap() {
  const people = await loadPeople();
  const family = buildFamilyGraph(people);
  const familyTree = new FamilyTree(family);

  const container = document.getElementById("app");
  if (!container) {
    throw new Error('Missing app container with id "app"');
  }

  renderFamilyTree(container, familyTree);
}

bootstrap();

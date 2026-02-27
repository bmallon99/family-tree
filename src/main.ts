import { loadPeople } from "./infrastructure/loadPeople.js";
import { buildFamilyGraph } from "./domain/buildFamilyGraph.js";
import { Person } from "./domain/person.js";

const app = document.getElementById("app");

const renderApp = (family: Map<string, Person>) => {
  console.log("Loaded people:", family);

  if (app) {
    app.innerHTML = "<h1>Family Tree Coming Soon 🌳</h1>";
  }
};

async function bootstrap() {
  const people = await loadPeople();
  const family = buildFamilyGraph(people);

  renderApp(family);
}

bootstrap();

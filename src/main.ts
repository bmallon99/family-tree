import { loadFamily } from "./domain/family.js";
import { Person } from "./types/person.js";

const app = document.getElementById("app");

const renderApp = (family: Record<string, Person>) => {
  console.log("Loaded people:", family);

  if (app) {
    app.innerHTML = "<h1>Family Tree Coming Soon 🌳</h1>";
  }
}

async function bootstrap() {
  const people = await loadFamily()
  renderApp(people)
}

bootstrap()

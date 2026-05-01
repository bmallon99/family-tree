import type * as D3 from "d3";
import { FamilyTree } from "../domain/familyTree.js";
import { Person } from "../domain/person.js";
import { buildHierarchyFromRoot, type D3Node } from "./buildHierarchy.js";

declare const d3: typeof D3;

type RenderFamilyTreeOptions = {
  onSelectionChange?: (selectedPeople: Person[]) => void;
};

export function renderFamilyTree(
  container: HTMLElement,
  familyTree: FamilyTree,
  options: RenderFamilyTreeOptions = {},
) {
  const roots = familyTree.getRoots();

  if (roots.length === 0) {
    throw new Error("No root found");
  }

  // For now: just take the first root
  const rootPerson = roots[0];

  const d3Data = buildHierarchyFromRoot(rootPerson);
  const root = d3.hierarchy(d3Data);

  const width = 800;
  const height = 600;

  const treeLayout = d3.tree<typeof d3Data>().size([width - 100, height - 100]);

  treeLayout(root);

  let selectedPersonIds: string[] = [];

  // Clear previous render
  container.innerHTML = "";

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg.append("g").attr("transform", "translate(50,50)");

  g.selectAll("path")
    .data(root.links())
    .enter()
    .append("path")
    .attr(
      "d",
      d3
        .linkVertical<any, any>()
        .x((d) => d.x)
        .y((d) => d.y),
    )
    .attr("fill", "none")
    .attr("stroke", "#ccc");

  const nodes = g
    .selectAll("g.node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("cursor", "pointer")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  nodes.append("circle").attr("r", 20).attr("fill", "#4f81bd");

  nodes
    .append("text")
    .attr("dy", 5)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .text((d) => d.data.person.name);

  nodes.on("click", (_event, d) => {
    const personId = d.data.person.id;
    selectedPersonIds = getNextSelectedPersonIds(selectedPersonIds, personId);
    updateSelectedNodes(nodes, selectedPersonIds);
    options.onSelectionChange?.(getSelectedPeople(root, selectedPersonIds));
  });
}

function getSelectedPeople(
  root: D3.HierarchyNode<D3Node>,
  selectedPersonIds: string[],
): Person[] {
  return root
    .descendants()
    .map((node) => node.data.person)
    .filter((person) => selectedPersonIds.includes(person.id));
}

function getNextSelectedPersonIds(
  selectedPersonIds: string[],
  personId: string,
): string[] {
  if (selectedPersonIds.includes(personId)) {
    return selectedPersonIds.filter((id) => id !== personId);
  }

  if (selectedPersonIds.length >= 2) {
    return [personId];
  }

  return [...selectedPersonIds, personId];
}

function updateSelectedNodes(
  nodes: D3.Selection<
    SVGGElement,
    D3.HierarchyNode<D3Node>,
    SVGGElement,
    unknown
  >,
  selectedPersonIds: string[],
) {
  nodes
    .select("circle")
    .attr("fill", (d) =>
      selectedPersonIds.includes(d.data.person.id) ? "#f59e0b" : "#4f81bd",
    )
    .attr("stroke", (d) =>
      selectedPersonIds.includes(d.data.person.id) ? "#92400e" : "none",
    )
    .attr("stroke-width", (d) =>
      selectedPersonIds.includes(d.data.person.id) ? 3 : 0,
    );

  nodes
    .select("text")
    .attr("font-weight", (d) =>
      selectedPersonIds.includes(d.data.person.id) ? "700" : "400",
    );
}

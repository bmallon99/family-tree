import type * as D3 from "d3";
import { FamilyTree } from "../domain/familyTree.js";
import { buildHierarchyFromRoot } from "./buildHierarchy.js";

declare const d3: typeof D3;

export function renderFamilyTree(
  container: HTMLElement,
  familyTree: FamilyTree,
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
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  nodes.append("circle").attr("r", 20).attr("fill", "#4f81bd");

  nodes
    .append("text")
    .attr("dy", 5)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .text((d) => d.data.person.name);
}

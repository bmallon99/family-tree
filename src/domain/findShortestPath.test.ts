import assert from "node:assert/strict";
import test from "node:test";
import { Person } from "./person.js";
import { findShortestPath } from "./findShortestPath.js";
import { Connection } from "./connection.js";

test("it works", () => {
  const jay = new Person("jay", "Jay");
  const claire = new Person("claire", "Claire");
  const mitch = new Person("mitch", "Mitch");
  const luke = new Person("luke", "Luke");
  const alex = new Person("alex", "Alex");
  const lily = new Person("lily", "Lily");

  lily.addParent(mitch);
  alex.addParent(claire);
  luke.addParent(claire);
  mitch.addParent(jay);
  claire.addParent(jay);

  const expectedPath = [
    new Connection(luke, claire, "parent"),
    new Connection(claire, jay, "parent"),
    new Connection(jay, mitch, "child"),
    new Connection(mitch, lily, "child"),
  ];

  const actualPath = findShortestPath(luke, lily);

  assert.deepEqual(actualPath, expectedPath);
});

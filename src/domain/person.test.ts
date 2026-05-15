import assert from "node:assert/strict";
import test from "node:test";
import { Person } from "./person.js";

test("addParent connects a child to a parent", () => {
  const parent = new Person("jay", "Jay");
  const child = new Person("claire", "Claire");

  child.addParent(parent);

  assert.deepEqual(child.parents, [parent]);
  assert.deepEqual(parent.children, [child]);
});

test("addParent does not add duplicate relationships", () => {
  const parent = new Person("jay", "Jay");
  const child = new Person("claire", "Claire");

  child.addParent(parent);
  child.addParent(parent);

  assert.equal(child.parents.length, 1);
  assert.equal(parent.children.length, 1);
});

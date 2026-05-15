import assert from "node:assert/strict";
import test from "node:test";
import { Person } from "./person.js";
import { getRelationship } from "./getRelationship.js";

test("does not allow an array of 0 people", () => {
  const people: Person[] = [];
  assert.equal(getRelationship(people), "N/A");
});

test("does not allow an array of 1 person", () => {
  const person1 = new Person("jay", "Jay");

  const people: Person[] = [person1];
  assert.equal(getRelationship(people), "N/A");
});

test("does not allow an array of 3 people", () => {
  const person1 = new Person("jay", "Jay");
  const person2 = new Person("claire", "Claire");
  const person3 = new Person("mitchell", "Mitchell");

  const people: Person[] = [person1, person2, person3];
  assert.equal(getRelationship(people), "N/A");
});

test("requires a unique 2 people", () => {
  const person1 = new Person("jay", "Jay");

  const people: Person[] = [person1, person1];
  assert.equal(getRelationship(people), "N/A");
});

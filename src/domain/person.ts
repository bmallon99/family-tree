export class Person {
  id: string;
  name: string;
  parents: Person[] = [];
  children: Person[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addParent(parent: Person) {
    if (!this.parents.includes(parent)) {
      this.parents.push(parent);
    }
    if (!parent.children.includes(this)) {
      parent.children.push(this);
    }
  }
}

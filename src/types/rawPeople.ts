type RawPerson = {
  id: string;
  name: string;
  parentIds: string[];
};

export type RawPeople = {
  [id: string]: RawPerson;
};

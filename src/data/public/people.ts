import { Person } from "../../types/person";

export const people: Record<string, Person> = {
    "jay": {
        id: "jay",
        name: "Jay",
        parentIds: [],
    },
    "claire": {
        id: "claire",
        name: "Claire",
        parentIds: ["jay"],
    },
    "mitchell": {
        id: "mitchell",
        name: "Mitchell",
        parentIds: ["jay"],
    }
};
import { Person } from "./person.js";
import { Connection } from "./connection.js";

export function findShortestPath(
  person1: Person,
  person2: Person,
): Connection[] {
  const allConnections = computeAllConnections(person1, person2);

  const connectionPath = [];

  let nextConn = allConnections.get(person2.id);
  while (nextConn) {
    connectionPath.push(nextConn);
    if (nextConn.p1 !== person1 && allConnections.get(nextConn.p1.id)) {
      nextConn = allConnections.get(nextConn.p1.id);
    } else {
      nextConn = undefined;
    }
  }

  return connectionPath.reverse();
}

function computeAllConnections(
  p1: Person,
  p2: Person,
): Map<string, Connection> {
  const visited = new Map<string, Connection>();
  visited.set(p1.id, new Connection(p1, p1, "self"));
  const queue = computeConnections(p1);

  let currConn: Connection | undefined;
  while (queue.length > 0) {
    currConn = queue.shift();

    if (currConn && !visited.get(currConn.p2.id)) {
      visited.set(currConn.p2.id, currConn);

      // if they match we don't need to search anymore
      if (currConn.p2 === p2) {
        return visited;
      }

      queue.push(...computeConnections(currConn.p2));
    }
  }

  return visited;
}

function computeConnections(p: Person): Connection[] {
  let connections: Connection[] = [];

  p.parents.forEach((pNext, _) => {
    connections.push(new Connection(p, pNext, "parent"));
  });

  p.children.forEach((pNext, _) => {
    connections.push(new Connection(p, pNext, "child"));
  });

  return connections;
}

class Node {
  constructor(cords, parent = null) {
    this.cords = cords;
    this.parent = parent;
  }
  static getPossibleMoves(cords) {
    const addends = [
      [2, 1],
      [1, 2],
      [2, -1],
      [1, -2],
      [-2, -1],
      [-1, -2],
      [-2, 1],
      [-1, 2],
    ];
    let moves = [];
    addends.forEach((addend) => {
      if (
        cords[0] + addend[0] >= 0 &&
        cords[1] + addend[1] >= 0 &&
        cords[0] + addend[0] <= 7 &&
        cords[1] + addend[1] <= 7
      ) {
        moves.push([cords[0] + addend[0], cords[1] + addend[1]]);
      }
    });
    return moves;
  }
}
function knightMove(start, end) {
  if (!validateInput(start, end)) {
    return null;
  }
  const queue = [new Node(start)];
  while (queue.length > 0) {
    let currentField = queue.shift();
    if (currentField.cords[0] === end[0] && currentField.cords[1] === end[1]) {
      let sol = [];
      while (currentField) {
        sol.unshift(currentField.cords);
        currentField = currentField.parent;
      }
      return sol;
    } else {
      Node.getPossibleMoves(currentField.cords).forEach((move) => {
        queue.push(new Node(move, currentField));
      });
    }
  }
}
function validateInput(start, end) {
  return (
    Array.isArray(start) &&
    start.length === 2 &&
    Number.isInteger(start[0]) &&
    Number.isInteger(start[1]) &&
    start[0] >= 0 &&
    start[0] <= 7 &&
    start[1] >= 0 &&
    start[1] <= 7 &&
    Array.isArray(end) &&
    end.length === 2 &&
    Number.isInteger(end[0]) &&
    Number.isInteger(end[1]) &&
    end[0] >= 0 &&
    end[0] <= 7 &&
    end[1] >= 0 &&
    end[1] <= 7
  );
}

console.log(knightMove([0, 0], [6, 3]));

import { Board } from "./type";

export const PossibleMoves = (
  piece: string,
  piecePosition: string,
  isWhite: boolean,
  board: Board
) => {
  let possibleMoves: string[] = [];

  let x: number, y: number;
  if (isWhite) {
    x = parseInt(piecePosition[1]);
    y = parseInt(piecePosition[0]);
  } else {
    x = 9 - parseInt(piecePosition[1]);
    y = 9 - parseInt(piecePosition[0]);
  }
  const isOpponentPiece = (x: number, y: number) => {
    const piece = board[x - 1][y - 1]; // Adjust for 0-indexed array
    return piece && piece.color !== (isWhite ? "w" : "b");
  };
  const isFreeSquare = (x: number, y: number) => {
    return !board[x - 1][y - 1];
  };

  switch (piece) {
    case "p":
      const direction = isWhite ? -1 : 1; // change for multiplayer
      const startRow = isWhite ? 7 : 2;
      if (isFreeSquare(x + direction, y)) {
        possibleMoves.push(positionForColor(isWhite, x + direction, y));
        // Double move from start position

        if (x === startRow && isFreeSquare(x + 2 * direction, y)) {
          possibleMoves.push(positionForColor(isWhite, x + 2 * direction, y));
        }
      }

      if (y > 1 && isOpponentPiece(x + direction, y - 1)) {
        possibleMoves.push(positionForColor(isWhite, x + direction, y - 1));
      }
      if (x < 8 && isOpponentPiece(x + direction, y + 1)) {
        possibleMoves.push(positionForColor(isWhite, x + direction, y + 1));
      }
      break;

    case "n":
      const knightMoves = [
        { x: x + 2, y: y + 1 },
        { x: x + 2, y: y - 1 },
        { x: x - 2, y: y + 1 },
        { x: x - 2, y: y - 1 },
        { x: x + 1, y: y + 2 },
        { x: x + 1, y: y - 2 },
        { x: x - 1, y: y + 2 },
        { x: x - 1, y: y - 2 },
      ];

      knightMoves.forEach((move) => {
        if (
          move.x > 0 &&
          move.x <= 8 &&
          move.y > 0 &&
          move.y <= 8 &&
          (isFreeSquare(move.x, move.y) || isOpponentPiece(move.x, move.y))
        ) {
          possibleMoves.push(positionForColor(isWhite, move.x, move.y));
        }
      });
      break;

    case "b":
      const bishopDirections = [
        { x: 1, y: 1 }, // top-right
        { x: -1, y: -1 }, // bottom-left
        { x: 1, y: -1 }, // bottom-right
        { x: -1, y: 1 }, // top-left
      ];

      possibleMoves = calculateMoves(bishopDirections, x, y, board, isWhite);
      break;

    case "r":
      const rookDirections = [
        { x: 1, y: 0 }, // top-right
        { x: -1, y: 0 }, // bottom-left
        { x: 0, y: -1 }, // bottom-right
        { x: 0, y: 1 }, // top-left
      ];
      possibleMoves = calculateMoves(rookDirections, x, y, board, isWhite);
      break;

    case "q":
      const queenDirections = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
      ];
      possibleMoves = calculateMoves(queenDirections, x, y, board, isWhite);
      break;

    case "k":
      const kingDirections = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
      ];
      kingDirections.forEach((direction) => {
        const newX = x + direction.x;
        const newY = y + direction.y;
        if (
          newX > 0 &&
          newX <= 8 &&
          newY <= 8 &&
          newY > 0 &&
          (isFreeSquare(newX, newY) || isOpponentPiece(newX, newY))
        ) {
          possibleMoves.push(positionForColor(isWhite, newX, newY));
        }
      });
      break;

    default:
      break;
  }

  return possibleMoves;
};
const positionForColor = (isWhite: boolean, x: number, y: number): string => {
  return isWhite ? `${y}${x}` : `${9 - y}${9 - x}`;
};
const calculateMoves = (
  directions: { x: number; y: number }[],
  x: number,
  y: number,
  board: Board,
  isWhite: boolean
) => {
  let moves: string[] = [];
  directions.forEach((direction) => {
    let newX = x;
    let newY = y;
    while (true) {
      newX += direction.x;
      newY += direction.y;
      if (newX <= 0 || newX > 8 || newY <= 0 || newY > 8) break;
      if (!board[newX - 1][newY - 1]) {
        moves.push(positionForColor(isWhite, newX, newY));
      } else {
        if (board[newX - 1][newY - 1]?.color !== (isWhite ? "w" : "b")) {
          moves.push(positionForColor(isWhite, newX, newY));
        }
        break;
      }
    }
  });
  return moves;
};

export const getMoves = (
  piece: string,
  piecePosition: string,
  playerColor: string,
  board: Board
): string[] => {
  let moves: string[] = [];

  if (
    (playerColor === "white" && piece.startsWith("b")) ||
    (playerColor === "black" && piece.startsWith("w"))
  ) {
    return [];
  }
  switch (piece) {
    case "bp":
      moves = PossibleMoves("p", piecePosition, false, board);
      break;
    case "wp":
      moves = PossibleMoves("p", piecePosition, true, board);
      break;
    case "bn":
      moves = PossibleMoves("n", piecePosition, false, board);
      break;
    case "wn":
      moves = PossibleMoves("n", piecePosition, true, board);
      break;
    case "bb":
      moves = PossibleMoves("b", piecePosition, false, board);
      break;
    case "wb":
      moves = PossibleMoves("b", piecePosition, true, board);
      break;
    case "br":
      moves = PossibleMoves("r", piecePosition, false, board);
      break;
    case "wr":
      moves = PossibleMoves("r", piecePosition, true, board);
      break;
    case "bk":
      moves = PossibleMoves("k", piecePosition, false, board);
      break;
    case "wk":
      moves = PossibleMoves("k", piecePosition, true, board);
      break;
    case "bq":
      moves = PossibleMoves("q", piecePosition, false, board);
      break;
    case "wq":
      moves = PossibleMoves("q", piecePosition, true, board);
      break;
    default:
      break;
  }
  return moves;
};

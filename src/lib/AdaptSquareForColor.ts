import { Square } from "chess.js";

export const GetCorrectSquare = (
  playerColor: "white" | "black",
  from: string,
  to: string
): { from: Square; to: Square } | null => {
  const convertToChessNotation = (
    numStr: string,
    color: "white" | "black"
  ): string | null => {
    const num = parseInt(numStr, 10);
    const fileIndex = Math.floor(num / 10);
    const rankIndex = num % 10;

    if (fileIndex < 1 || fileIndex > 8 || rankIndex < 1 || rankIndex > 8) {
      return null;
    }

    let file: string;
    let rank: number;

    if (color === "white") {
      file = String.fromCharCode(96 + fileIndex); // 'a' is 97 in ASCII
      rank = 9 - rankIndex; // Reverse the rank for white
    } else {
      file = String.fromCharCode(105 - fileIndex); // 'h' is 104 in ASCII, so 105 - fileIndex gives 'h' to 'a'
      rank = rankIndex; // Reverse the rank for black
    }

    return `${file}${rank}`;
  };

  const fromNotation = convertToChessNotation(from, playerColor);
  const toNotation = convertToChessNotation(to, playerColor);

  if (!fromNotation || !toNotation) {
    return null;
  }

  return { from: fromNotation as Square, to: toNotation as Square };
};

export const ConvertChessNotationToSquare = (
  playerColor: "white" | "black",
  notation: string
): string | null => {
  const convertFromChessNotation = (
    notation: string,
    color: "white" | "black"
  ): string | null => {
    if (notation.length !== 2) return null;

    const file = notation[0];
    const rank = parseInt(notation[1], 10);

    if (rank < 1 || rank > 8) return null;

    let fileIndex: number;
    let rankIndex: number;

    if (color === "white") {
      fileIndex = file.charCodeAt(0) - 96; // 'a' is 97 in ASCII, so 'a' becomes 1, 'b' becomes 2, etc.
      rankIndex = 9 - rank; // Reverse the rank for white
    } else {
      fileIndex = 105 - file.charCodeAt(0); // 'h' is 104 in ASCII, so 'h' becomes 1, 'g' becomes 2, etc.
      rankIndex = rank; // Reverse the rank for black
    }

    if (fileIndex < 1 || fileIndex > 8 || rankIndex < 1 || rankIndex > 8) {
      return null;
    }

    return `${fileIndex}${rankIndex}`;
  };

  return convertFromChessNotation(notation, playerColor);
};

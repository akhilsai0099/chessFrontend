import { Piece } from "../lib/type";
export function fenToPieceList(
  fen: string,
  playerColor: "white" | "black"
): Piece[] {
  const [placement] = fen.split(" ");
  const rows = placement.split("/");

  const pieceList: Piece[] = [];

  function addPieces(row: string, y: number) {
    let x = 1;
    for (const char of row) {
      if (!isNaN(parseInt(char))) {
        x += parseInt(char);
      } else {
        pieceList.push({ name: char, x: x, y: y });
        x++;
      }
    }
  }

  if (playerColor === "black") {
    // White's view: White pieces at row 7 and Black pieces at row 1
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].split("").reverse().join("");
      const y = 8 - i;
      addPieces(row, y);
    }
  } else {
    // Black's view: Black pieces at row 7 and White pieces at row 1
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const y = i + 1;
      addPieces(row, y);
    }
  }

  return pieceList;
}

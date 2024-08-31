type PieceMatrix = (string[] | null[])[];
export let Board: PieceMatrix;

export function fenToMatrix(fen: string): PieceMatrix {
  const [placement] = fen.split(" ");
  const rows = placement.split("/");
  const board: PieceMatrix = Array.from({ length: 8 }, () =>
    Array(8).fill(null)
  );

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let colIndex = 0;

    for (const char of row) {
      if (!isNaN(parseInt(char))) {
        colIndex += parseInt(char);
      } else {
        board[i][colIndex] = char;
        colIndex++;
      }
    }
  }
  Board = board;
  // console.log(Board);
  return board;
}

// // Example usage:
// const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
// const boardMatrix = fenToMatrix(fen);
// console.log(boardMatrix);

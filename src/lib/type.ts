import { PieceColor, PieceType, Square } from "chess.js";

export type Piece = {
  name: string;
  x: number;
  y: number;
};

export type PlayerColor = "white" | "black";

export type Board = Array<
  Array<{ type: PieceType; color: PieceColor; square: Square } | null>
>;

import { MouseEventHandler } from "react";
import { getMoves } from "../lib/PossibleMove";
import { ConvertChessNotationToSquare } from "../lib/AdaptSquareForColor";
import { Board, PlayerColor } from "../lib/type";
import { removeClassByPrefix } from "../lib/Utils";

const PieceComp = ({
  setHints,
  playerColor,
  squareSize,
  board,
}: {
  setHints: React.Dispatch<React.SetStateAction<string[]>>;
  playerColor: PlayerColor;
  squareSize: Number;
  board: Board;
}) => {
  const pieceClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    const elem = e.target as HTMLDivElement;
    const piecePosition = elem.dataset.piece;
    const pieceName = elem.dataset.name;
    const highlight = document.getElementById("highlight");

    if (piecePosition && pieceName) {
      const fromSquare = ConvertChessNotationToSquare(
        playerColor,
        piecePosition
      ) as string;

      highlight?.classList.remove("hidden");
      removeClassByPrefix(highlight, "square");
      highlight?.classList.add(`square${fromSquare}`);

      const hint = getMoves(pieceName, fromSquare, playerColor, board);
      setHints(hint);
    }
  };

  return (
    <>
      {board.flatMap((row, rowIndex) =>
        row.map((item, colIndex) =>
          item ? (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{ width: `${squareSize}px`, height: `${squareSize}px` }}
              className={`absolute ${item.color}${
                item.type
              } left-0 square${ConvertChessNotationToSquare(
                playerColor,
                item.square
              )} transition-transform`}
              data-piece={item.square}
              onClick={pieceClickHandler}
              data-name={`${item.color}${item.type}`}
            ></div>
          ) : null
        )
      )}
    </>
  );
};

export default PieceComp;

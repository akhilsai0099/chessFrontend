import { MouseEventHandler, useEffect, useRef, useState } from "react";
import "./chess.css";
import PieceComp from "./Piece";
import Hints from "./Hints";
import { GetCorrectSquare } from "../lib/AdaptSquareForColor";
import toast from "react-hot-toast";
import { Chess } from "chess.js";
import {
  playCaptureSound,
  playNotifySound,
  playSound,
  removeClassByPrefix,
} from "../lib/Utils";

const ChessBoard = ({ socket }: { socket: WebSocket | null }) => {
  const [board, setBoard] = useState(Chess());
  const [boardSize, setBoardSize] = useState(
    Math.min(window.innerWidth, window.innerHeight) - 10
  );
  const squareSize = boardSize / 8;
  let [playerColor, setPlayerColor] = useState<"white" | "black">("white");
  const playerColorRef = useRef(playerColor);
  const playerColorInitialized = useRef(false);
  const [from, setFrom] = useState("");
  const [hints, setHints] = useState<string[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    playerColorRef.current = playerColor;
  }, [playerColor]);

  useEffect(() => {
    const handleResize = () => {
      setBoardSize(Math.min(window.innerWidth, window.innerHeight) - 10);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    playerColorRef.current = playerColor;
  }, [playerColor]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case "init":
          if (!playerColorInitialized.current) {
            toast(`Game has started : You are ${message.color}`, {
              id: "init",
              style: {
                backgroundColor: message.color,
                color: message.color === "white" ? "black" : "white",
              },
            });
            playNotifySound();
            setPlayerColor(message.color);
            playerColorInitialized.current = true;
          }
          break;
        case "update":
          setBoard((prevBoard) => {
            const newBoard = { ...prevBoard };
            let move = newBoard.move(message.move);
            move?.captured ? playCaptureSound() : playSound();
            return newBoard;
          });

          break;
        default:
          break;
      }
    };

    socket.onmessage = handleMessage;

    return () => {
      if (socket) {
        socket.onmessage = null; // Clean up the listener on unmount
      }
    };
  }, [socket]);

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const squareSize = boardSize / 8;
    let elem;
    if (boardRef.current) {
      elem = boardRef.current;

      const clickedSquareX =
        Math.floor((e.clientX - elem.getBoundingClientRect().x) / squareSize) +
        1;
      const clickedSquareY =
        Math.floor((e.clientY - elem.getBoundingClientRect().y) / squareSize) +
        1;
      const clickedSquare = `${clickedSquareX}${clickedSquareY}`;

      if (from) {
        if (from !== clickedSquare) {
          handleMoveTo(clickedSquare);
        } else {
          resetMove();
        }
      } else {
        setFrom(clickedSquare);
      }
    }
  };

  const handleMoveTo = (clickedSquare: string) => {
    const highlight = document.getElementById("highlight");

    highlight?.classList.add("hidden");
    removeClassByPrefix(highlight, "square");

    if (hints.includes(clickedSquare)) {
      let finalmove;

      finalmove = GetCorrectSquare(playerColor, from, clickedSquare);

      if (finalmove) {
        let move = board.move({
          from: finalmove?.from,
          to: finalmove?.to,
        });
        move?.captured ? playCaptureSound() : playSound();

        socket?.send(JSON.stringify({ type: "move", move: finalmove }));
        setFrom("");
        setHints([]);
      }
    }
  };

  const resetMove = () => {
    const highlight = document.getElementById("highlight");
    setHints([]);
    highlight?.classList.add("hidden");
    removeClassByPrefix(highlight, "square");
    setFrom("");
  };

  return (
    <>
      <div
        className={`board  relative transition-transform`}
        style={{ width: `${boardSize}px`, height: `${boardSize}px` }}
        onClick={handleClick}
        ref={boardRef}
      >
        <Hints hints={hints} squareSize={squareSize} />
        <div
          className={`absolute  bg-yellow-200 hidden`}
          style={{ width: `${squareSize}px`, height: `${squareSize}px` }}
          id="highlight"
        ></div>
        <PieceComp
          // image={image}
          setHints={setHints}
          playerColor={playerColor}
          squareSize={squareSize}
          board={board.board()}
        />
      </div>
    </>
  );
};

export default ChessBoard;

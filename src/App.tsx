import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import ChessBoard from "./components/ChessBoard";
import { useSocket } from "./hooks/useSocket";

function App() {
  const socket = useSocket();
  return (
    <div className="flex-col sm:flex justify-center items-center  min-h-[100svh] miv-w-[100svh]">
      <div>
        <Toaster />
      </div>
      <ChessBoard socket={socket} />
      <div>
        <button
          className=" rounded-lg p-4 bg-slate-200 "
          onClick={() => {
            socket?.send(JSON.stringify({ type: "init" }));
            toast.loading("Waiting for another Player...", {
              id: "init",
            });
          }}
        >
          Start game
        </button>
      </div>
    </div>
  );
}

export default App;

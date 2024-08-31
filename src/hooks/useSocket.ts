import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://chessbackend-w88a.onrender.com");
    // const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      setSocket(ws);
    };
    ws.onclose = () => {
      setSocket(null);
      toast.error("No Connection to server", { id: "Conn-error" });
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return socket;
};

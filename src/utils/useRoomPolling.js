import { useEffect } from "react";
import { getRoom } from "./gameRoomApi";

export function useRoomPolling({ roomId, enabled, onUpdate, onAbandoned }) {
  useEffect(() => {
    if (!enabled || !roomId) return;

    const interval = setInterval(async () => {
      try {
        const { gameState } = await getRoom(roomId);

        if (gameState.phase === "abandoned") {
          clearInterval(interval);
          onAbandoned?.();
          return;
        }

        onUpdate(gameState);


      } catch {}
    }, 1000);

    return () => clearInterval(interval);
  }, [roomId, enabled]);
}

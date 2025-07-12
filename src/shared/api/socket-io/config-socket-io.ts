import { DEV_TELEGRAM_AUTH } from "@/shared/constants/auth-token-constants";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_WS_DOMAIN;

export const socket: Socket = io(SOCKET_URL, {
  path: "/socket.io",
  transports: ["websocket"],
  auth: {
    authorization: DEV_TELEGRAM_AUTH,
  },
});

socket.on("connect", () => {
  // console.log('Connected:', socket.id);
});

socket.on("connect_error", () => {
  // console.error('Connection error:', err.message);
});

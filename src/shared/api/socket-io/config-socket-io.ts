import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_WS_DOMAIN;

export const socket: Socket = io(SOCKET_URL, {
  transports: ['websocket'],
  auth: { token: '...' }, // если нужна авторизация
});

import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_WS_DOMAIN;

export const socket: Socket = io(SOCKET_URL, {
  path: '/socket.io',
  transports: ['websocket'],
  auth: {
    authorization:
      'query_id=AAHTmpAvAAAAANOakC-stxJc&user=%7B%22id%22%3A798005971%2C%22first_name%22%3A%22HUSAN%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Husan203%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FRDGUIBFtIMJxlvGNI_Q5WUJj7w9Fo5lLre75kJq0kyI.svg%22%7D&auth_date=1751892088&signature=u8xAlqA2qvlRxnIIEUFZNa50PYpqT0x1igtaTkyQ7hDHDUFV_JU5N4FjFYTjtKq8ZCkQQZHz9elu8u-JNXpNDQ&hash=16fb51f6ca53fce70da0433c9093f4625b836eb634cc4d756f565dfa82960ea3',
  },
});

socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});

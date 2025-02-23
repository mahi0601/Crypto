import { io } from 'socket.io-client';

const socket = io("ws://localhost:5000"); // or ws://localhost:6001 if using spot/futures

socket.on('connect', () => console.log('Connected to WebSocket'));

export default socket;

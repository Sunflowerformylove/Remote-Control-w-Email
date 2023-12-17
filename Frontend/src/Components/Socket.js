import { io } from "socket.io-client";
const URL = "http://localhost:5000";
const Socket = io(URL, {autoConnect: false});

export default Socket;
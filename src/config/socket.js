import socketClient from "socket.io-client";

const socket = socketClient.connect(process.env.REACT_APP_WS);

export default socket;
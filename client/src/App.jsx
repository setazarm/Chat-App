import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username && room) {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <>
      {!showChat ? (
        <div className="flex flex-col gap-4 w-3/5 mx-auto">
          <h3 className="text-2xl font-bold my-4 text-center ">Join a Chat</h3>
          <input
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            type="text"
            placeholder="your name..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            type="text"
            placeholder="Room..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            onClick={joinRoom}
          >
            Join a Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </>
  );
}

export default App;

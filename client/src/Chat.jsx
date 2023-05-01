/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const addMessageToList = (message) => {
    setMessageList((list) => [...list, message]);
  };

  const handleSendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        room: room,
        author: username,
        content: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      addMessageToList(messageData);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      addMessageToList(data);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-screen justify-between w-2/4 mx-auto">
    <div className="h-full bg-gray-500">
      {messageList.map((message) => {
        return (
          <div key={message.time} className={`flex ${username === message.author ? "justify-start" : "justify-end"} mb-4`}>
            <div className={`bg-white rounded-lg px-4 py-2 ${username === message.author ? "mr-4" : "ml-4"} text-sm`}>
              <p className="font-medium">{username === message.author ? "You" : message.author}</p>
              <p>{message.content}</p>
              <p className="text-gray-500 text-xs">{message.time}</p>
            </div>
          </div>
        );
      })}
    </div>

      <div className="h-4/5 bg-gray-300"></div>
      <div className="flex items-center justify-between bg-gray-500 p-4">
        <input
          className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          type="text"
          placeholder="Hey..."
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg ml-4 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          onClick={handleSendMessage}
        >
          &#9658;
        </button>
      </div>
    </div>
  );
}

export default Chat;

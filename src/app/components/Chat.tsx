"use client";
import React, { useState } from "react";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello I am orderBot, an automated service design to collect the orders for  a pizza restaurant. How may I assist you today?",
      sender: "assistant",
    },
  ]);

  const handleSendMessage = async () => {
    try {
      setMessages((prevMessage) => [
        ...prevMessage,
        { text: input, sender: "user" },
      ]);

      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ prompt: input }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages((prevMessage) => [
          ...prevMessage,
          { text: data.content, sender: data.role },
        ]);
      }
      setInput("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 m-4">
      <div className="relative ">
        <button
          className="w-16 h-16 bg-[#D6AD46] text-white rounded-full items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "close" : "open"}
        </button>

        {isOpen && (
          <div className="absolute bottom-0 right-0 mb-16 w-96">
            <div className="bg-white border rounded-lg overflow-hidden shadow-lg">
              <div className="flex items-center justify-between bg-[#D6AD46] text-white p-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 mr-2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5-2 4-2s4 2 4 2" />
                    <line x1="12" y1="2" x2="12" y2="10" />
                    <line x1="12" y1="14" x2="12" y2="22" />
                  </svg>
                  <h2 className="text-lg font-semibold">Pizza Assistant</h2>
                </div>
                <button
                  className="text-sm underline cursor-pointer hover:text-blue-700 focus:outline-none focus:underline"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
              <div
                className="flex-1 overflow-y-auto p-4"
                style={{ maxHeight: "calc(300px - 60px)" }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      msg.sender === "assistant" ? "text-left" : "text-right"
                    }`}
                  >
                    <div
                      className={`${
                        msg.sender === "assistant"
                          ? "bg-blue text- rounded-l-lg"
                          : "bg-gray text-white rounded-r-lg"
                      } p-2`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className=" flex bg-[#D6AD46] p-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full border rounded p-2 focus:outline-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  className="outline text-white  w-[25%]  mx-1 rounded"
                  onClick={() => handleSendMessage()}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPopup;

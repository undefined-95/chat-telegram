import React, { useEffect, useState } from "react";
import axios from "axios";

export const ChatPage = () => {

  const [chats, setchats] =useState([])

  const fetchChats = async () => {
    const {data} = await axios.get("/api/chat");
    console.log(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
  <div>
    chat-page
    </div>
    );
};

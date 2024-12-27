import React, { useState } from "react";
import ChatContent from "./ChatContent/ChatContent";
import ChatList from "./chatList/ChatList";
import { isNullOrEmpty } from "../../utils/utils";
import { FormChat } from "../../const/FormChat";

const InputItems = React.forwardRef(({ action, disabled }, ref) => {
  const [selectedChat, setSelectedChat] = useState();

  return (
    <div style={{ height: "calc(100vh - 70px)" }} className="grid grid-cols-5">
      <ChatList className="" selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
      {isNullOrEmpty(selectedChat?.[FormChat.chatId]) ? (
        <div className="col-span-4 py-20">Chọn một cuộc hội thoại để bắt đầu</div>
      ) : (
        <ChatContent
          className="col-span-4"
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      )}
    </div>
  );
});

export default InputItems;

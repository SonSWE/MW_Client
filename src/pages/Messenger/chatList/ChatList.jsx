import { useEffect, useState } from "react";
import "./chatList.css";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "antd";
import { db } from "../../../utils/firebase";
import { useBusinessAction } from "../BusinessAction";
import BaseAvatar from "../../../components/element/BaseAvatar";

const ChatList = ({ className, selectedChat, setSelectedChat }) => {
  const apiClient = useBusinessAction();
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  const currentUser = useSelector((state) => state.authReducer);

  useEffect(() => {
    //danh sách cuộc trò chuyện của user đang đăng nhập
    const unSub = onSnapshot(doc(db, "userchats", currentUser.username), async (res) => {
      const items = res.data().chats;

      const promises = items.map(async (item) => {
        const res = await apiClient.GetUserById(item.receiverId);
        const userRevice = res?.data;

        return {
          ...item,
          userReceive: {
            username: userRevice.userName,
            name: userRevice.name,
            avatar: userRevice.avatar,
          },
        };
      });

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unSub();
    };
  }, [currentUser?.username]);

  const handleSelect = async (chat) => {
    //cập nhật trạng thái đã xem
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);
    userChats[chatIndex].isSeen = true;
    const userChatsRef = doc(db, "userchats", currentUser.username);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      setSelectedChat({ chatId: chat.chatId, userReceive: chat.userReceive });
    } catch (err) {
      console.log(err);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.userReceive.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className={`${className}`}>
      <div className="chatList">
        <div className="search">
          <Input
            className="rounded-full"
            prefix={<FontAwesomeIcon icon={faSearch} />}
            placeholder="Tìm kiếm"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        {filteredChats.map((chat) => (
          <div
            className={`item ${chat.chatId === selectedChat?.chatId ? "bg-[#73b1e029]" : ""}`}
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            // style={{
            //   backgroundColor: chat?.isSeen ? "transparent" : "#5183fe14",
            // }}
          >
            <BaseAvatar size={50} src={chat.userReceive.avatar} />
            <div className="texts">
              <span>{chat.userReceive.name}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;

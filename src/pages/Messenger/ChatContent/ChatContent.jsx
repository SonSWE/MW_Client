import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useSelector } from "react-redux";
import { FormChat } from "../../../const/FormChat";
import { Button, Input, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faInfoCircle,
  faLink,
  faPaperclip,
  faPaperPlane,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile, faFileAlt, faImage } from "@fortawesome/free-regular-svg-icons";
import BaseAvatar from "../../../components/element/BaseAvatar";
// import { format } from "timeago.js";

const ChatContent = ({ className, selectedChat, setSelectedChat }) => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const currentUser = useSelector((state) => state.authReducer);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  useEffect(() => {
    if (selectedChat) {
      const unSub = onSnapshot(doc(db, "chats", selectedChat.chatId), (res) => {
        setChat(res.data());
      });

      return () => {
        unSub();
      };
    }
  }, [selectedChat]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        // imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", selectedChat.chatId), {
        messages: arrayUnion({
          senderId: currentUser.username,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.username, selectedChat?.[FormChat.userReceive].username];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === selectedChat.chatId);

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.username ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setImg({
        file: null,
        url: "",
      });

      setText("");
    }
  };

  return (
    <div className={`${className}`}>
      <div className={`chat`}>
        <div className="top">
          <div className="user">
            <BaseAvatar size={50} src={selectedChat?.[FormChat.userReceive]?.avatar} />
            <div className="texts">
              <span>{selectedChat?.[FormChat.userReceive]?.name}</span>
              {/* <p>khách hàng</p> */}
            </div>
          </div>
          <div className="icons">
            <Button type="text" icon={<FontAwesomeIcon icon={faInfoCircle} />} />
          </div>
        </div>
        <div className="center">
          {chat?.messages?.map((message, i) => (
            <div
              className={message.senderId === currentUser?.username ? "message own" : "message"}
              key={i}
              // key={message?.createAt}
            >
              <div className="texts">
                {message.img && <img src={message.img} alt="" />}
                <p>{message.text}</p>
                {/* <span>{format(message.createdAt.toDate())}</span> */}
                {/* <span>{message.createdAt.toDate()}</span> */}
              </div>
            </div>
          ))}
          {img.url && (
            <div className="message own">
              <div className="texts">
                <img src={img.url} alt="" />
              </div>
            </div>
          )}
          <div ref={endRef}></div>
        </div>
        <div className="bottom">
          <div className="icons">
            <Tooltip title="Đính kèm file">
              <Button type="text" icon={<FontAwesomeIcon icon={faImage} size="lg" />} />
            </Tooltip>
          </div>
          <Input
            placeholder={"Nhập tin nhắn..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="emoji">
            <Tooltip title="Chọn nhãn dán" onClick={() => setOpen((prev) => !prev)}>
              <FontAwesomeIcon icon={faFaceSmile} size="lg" />
            </Tooltip>

            <div className="picker">
              <EmojiPicker open={open} onEmojiClick={handleEmoji} />
            </div>
          </div>
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faPaperPlane} size="lg" />}
            onClick={handleSend}
          >
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;

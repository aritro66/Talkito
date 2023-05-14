import React, { useEffect, useState, useRef, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import chatStyle from "./style.module.css";
import { io } from "socket.io-client";
import { UserContext } from "../../contexts/usercontext";
import { fetchUsers, fetchMessages, sendMessage as sendM } from "../../api/api";
import ChatInput from "../../components/ChatInput";
import ChatContacts from "../../components/ChatContacts";
import ChatList from "../../components/ChatList";

export default function Chat() {
  const socket = useRef();
  const msgRecv = useRef();
  const user = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [toUser, setToUser] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.email) {
      socket.current = io(import.meta.env.VITE_SERVER_URL, {
        transports: ["websocket"],
      });
      socket.current.emit("add-user", user.email);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchUsers(user?.email)
      .then((res) => res.data)
      .then((data) => {
        setContacts(data);
      });
  }, [user?.email]);

  useEffect(() => {
    if (user?.email && toUser?.email) {
      fetchMessages(user?.email, toUser?.email)
        .then((res) => res.data)
        .then((data) => {
          setCurrentChat(() => data);
        });
    }
  }, [user?.email, toUser?.email]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        if (msg.from === msgRecv.current) {
          setCurrentChat((prev) => [
            ...prev,
            {
              sender: msg.from,
              receiver: msg.to,
              message: msg.msg,
              create_time: msg.create_time,
              youSent: false,
            },
          ]);
        }
      });
      socket.current.on("online-users", (users) => {
        setContacts((prev) => {
          let newContacts = prev.map((contact) => {
            if (users.includes(contact.email)) {
              return { ...contact, online: true };
            }
            return { ...contact, online: false };
          });
          return newContacts;
        });
      });
    }
  }, []);

  const handleTyping = () => {
    socket.current.emit("typing", {
      from: user.email,
      to: toUser.email,
    });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        socket.current.disconnect();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;

    socket.current.emit("send-msg", {
      from: user.email,
      to: toUser.email,
      create_time: new Date().toISOString(),
      msg: message.trim(),
    });

    await sendM({ from: user.email, to: toUser.email, text: message.trim() });

    setCurrentChat((prev) => [
      ...prev,
      {
        sender: user.email,
        receiver: toUser.email,
        message: message.trim(),
        create_time: new Date().toISOString(),
        youSent: true,
      },
    ]);
  };

  return (
    <div id={chatStyle["body"]}>
      <div id={chatStyle["container"]}>
        <ChatContacts
          chatStyle={chatStyle}
          contacts={contacts}
          setToUser={setToUser}
          msgRecv={msgRecv}
          user={user}
        />
        <main>
          <ChatList
            chatStyle={chatStyle}
            toUser={toUser}
            handleLogout={handleLogout}
            currentChat={currentChat}
            msgRecv={msgRecv}
            socket={socket}
          />
          <ChatInput
            setMessage={setMessage}
            sendMessage={sendMessage}
            toUser={toUser}
            handleTyping={handleTyping}
          />
        </main>
      </div>
    </div>
  );
}

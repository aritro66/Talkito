import React, { useState, useEffect } from "react";
import icongraysrc from "../../assets/icon_gray2.png";

export default function ChatList({
  chatStyle,
  toUser,
  currentChat,
  handleLogout,
  socket,
  msgRecv,
}) {
  const [userTying, setUserTyping] = useState({ email: "", typing: false });

  useEffect(() => {
    if (socket.current) {
      socket.current.on("user-typing", (info) => {
        if (info.from === msgRecv.current) {
          setUserTyping(() => ({ email: info.from, typing: true }));
          setTimeout(() => {
            setUserTyping(() => ({ email: "", typing: false }));
          }, 750);
        }
      });
    }
  }, [socket.current]);

  return (
    <>
      <header>
        <img
          style={{
            visibility: toUser === undefined ? "hidden" : "visible",
          }}
          src={toUser?.imgURL}
          alt=""
        />
        <div
          style={{
            visibility: toUser === undefined ? "hidden" : "visible",
          }}
        >
          <h2>Chat with {toUser?.name}</h2>
          <h3>already {currentChat.length} messages</h3>
          <h3 id={chatStyle["typing-status"]}>
            {userTying.email === toUser?.email && userTying.typing
              ? "typing..."
              : ""}
          </h3>
        </div>
        <img
          src="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-logout-icon-png-image_925699.jpg"
          alt=""
          onClick={handleLogout}
        />
      </header>
      <ul id={chatStyle["chat"]}>
        {currentChat?.length > 0 ? (
          currentChat?.map((mess) => {
            return (
              <>
                <li
                  className={mess.youSent ? chatStyle["me"] : chatStyle["you"]}
                >
                  <div className={chatStyle["entete"]}>
                    <span
                      className={`${chatStyle["status"]} ${
                        mess.youSent ? chatStyle["blue"] : chatStyle["green"]
                      }`}
                    ></span>
                    <h2></h2>
                    <h3>{new Date(mess?.create_time).toDateString()}</h3>
                  </div>
                  <div className={chatStyle["triangle"]}></div>
                  <div className={chatStyle["message"]}>{mess.message}</div>
                </li>
              </>
            );
          })
        ) : (
          <div id={chatStyle["welcome"]}>
            <img src={icongraysrc} alt="" />
            <h2>Welcome to Talkito</h2>
            <h3>
              Talk with everyone and keep your conversations secure with our
              trusted chat application. Connect with confidence, anytime and
              anywhere.
            </h3>
          </div>
        )}
      </ul>
    </>
  );
}

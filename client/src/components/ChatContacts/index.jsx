import React from "react";

export default function ChatContacts({
  chatStyle,
  contacts,
  msgRecv,
  user,
  setToUser,
}) {
  return (
    <>
      <aside>
        <header>
          <div id={chatStyle["info"]}>
            <img src={user?.imgURL} alt="" />
            <p>{user?.name}</p>
          </div>
          <input type="text" placeholder="search" />
        </header>
        <ul>
          {contacts.length > 0
            ? contacts.map((contact, index) => {
                return (
                  <>
                    <li
                      key={index}
                      onClick={() => {
                        setToUser(() => {
                          msgRecv.current = contact.email;
                          return contact;
                        });
                      }}
                    >
                      <img src={contact.imgURL} alt="" />
                      <div>
                        <h2>{contact.name}</h2>
                        <h3>
                          <span
                            className={`${chatStyle["status"]} ${
                              contact?.online
                                ? chatStyle["green"]
                                : chatStyle["orange"]
                            }`}
                          ></span>
                          {contact?.online ? "online" : "offline"}
                        </h3>
                      </div>
                    </li>
                  </>
                );
              })
            : ""}
        </ul>
      </aside>
    </>
  );
}

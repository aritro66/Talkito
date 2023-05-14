import React from "react";

export default function ChatInput({
  setMessage,
  sendMessage,
  toUser,
  handleTyping,
}) {
  return (
    <>
      <footer>
        <textarea
          placeholder="Type your message"
          disabled={!toUser}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png"
          alt=""
        />
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png"
          alt=""
        />
        <button onClick={sendMessage} disabled={!toUser}>
          Send
        </button>
      </footer>
    </>
  );
}

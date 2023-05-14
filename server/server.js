const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const userroutes = require("./routes/userroutes");
const messageroutes = require("./routes/messageroutes");
const socket = require("socket.io");
require("dotenv").config();
const PORT = process.env.PORT || 4001;
console.log(process.env.CLIENT_ORIGIN);
app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/api/users", userroutes);
app.use("/api/messages", messageroutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();
const getOnlineUsers = () => {
  const userlist = [];
  for (let [key, value] of onlineUsers.entries()) {
    userlist.push(key);
  }
  return userlist;
};

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userEmail) => {
    console.log("socket info - > ", userEmail, socket.id);
    onlineUsers.set(userEmail, socket.id);
    console.log(onlineUsers);
    const userlist = getOnlineUsers();
    io.emit("online-users", userlist);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data);
    }
  });

  socket.on("typing", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("user-typing", data);
    }
  });

  socket.on("get-online-users", () => {
    console.log("get-online-users");
    const userlist = getOnlineUsers();
    io.emit("online-users", userlist);
  });

  socket.on("disconnect", () => {
    let deleteuser = "";
    for (let [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        deleteuser = key;
        break;
      }
    }
    if (deleteuser !== "") {
      onlineUsers.delete(deleteuser);
    }
    console.log(socket.id + " disconnected " + deleteuser);
    const userlist = getOnlineUsers();
    io.emit("online-users", userlist);
  });
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

io.on("connection", (socket) => {
  socket.on("join-room", () => {
    socket.join("12345678");
    console.log("server-join");
  });
  socket.on("send-msg", (msg) => {
    socket.to("12345678").emit("recieve-msg", msg);
    console.log(msg);
  });
  socket.on("disconnect", () => {
    console.log("Disconnect");
  });
});

http.listen(4300, function () {
  console.log("room is on 4300");
});

//made by veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

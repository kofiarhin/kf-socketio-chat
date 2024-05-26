const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// setup middleware
const publicPath = path.resolve(__dirname, "dist");
app.use(express.static(publicPath));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    io.emit("new_message", data);
  });
});

if(process.env.NODE_ENV == "production") {
    const filePath = path.join(__dirname, "dist", "index.html")
    app.get("*", (req, res) => {
        return res.sendFile(filePath)
    })
}

server.listen(port, () =>
  console.log(`server stared and listening on ${port}`)
);

import Server from "./src/core/server";
import { Server as ServerIo } from "socket.io";
import { createServer } from "http";
import express from "express";
import { resolve } from "path";
import Queues from "./src/core/queues";
import User from "./src/app/user";
import IO from "./src/core/io";

const server = new Server(3003);
const sv = createServer(server.app);
const io = new ServerIo(sv);
console.log("Static files " + resolve(__dirname, "public"));

server.app.use("/static", express.static(resolve(__dirname, "public")));
const _io = new IO();
sv.listen(server.port, () => {
  console.log("Server running on " + server.port);

  _io.bind(io);
});

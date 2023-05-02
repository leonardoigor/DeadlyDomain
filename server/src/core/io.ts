import { DefaultEventsMap } from "socket.io/dist/typed-events";
import User from "../app/user";
import Queues from "./queues";
import { Server as ServerIo } from "socket.io";

export default class IO {
  queue: Queues;
  constructor() {
    this.queue = new Queues();
  }
  bind(
    io: ServerIo<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    io.on("connection", (socket) => {
      this.queue.bind(socket);
      let user: User | undefined;
      console.log(user);

      console.log("User connected " + socket.id);

      socket.on("disconnect", () => {
        console.log("Disconneted " + socket.id);
      });
    });
  }
}

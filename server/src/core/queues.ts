import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import list_queue from "./list_queues";
import { _UserData } from "../app/user";

interface _Queue {
  queue: string;
  action: (
    q: Queues,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) => (data: any) => void;
}

export { _Queue };
export default class Queues {
  broadcast(cb: () => any, room: string, ev: string) {
    this.players.forEach(async (p) => {
      if (p.socket) {
        await p.socket.join(room);
        p.socket.emit(ev, cb());
      }
    });
  }
  players: _UserData[];
  addPlayer(data: _UserData) {
    this.players.push(data);
  }
  list: _Queue[];
  constructor() {
    this.players = [];
    this.list = [];
  }
  bind(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    list_queue.forEach((data) => {
      socket.on(data.queue, data.action(this, socket));
    });
  }
}

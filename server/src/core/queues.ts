import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import list_queue from "./list_queues";
import { _UserData } from "../app/user";
import LobbyHandle from "../app/lobby_handle";

interface _Queue {
  queue: string;
  action: (
    q: Queues,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    lobbs: LobbyHandle
  ) => (data: any) => void;
}

export { _Queue };
export default class Queues {
  players: _UserData[];
  list: _Queue[];
  lobbs: LobbyHandle;

  constructor() {
    this.players = [];
    this.list = [];
    this.lobbs = new LobbyHandle();
  }

  addPlayer(data: _UserData) {
    this.players.push(data);
  }
  broadcast(cb: () => any, room: string, ev: string) {
    this.players.forEach(async (p) => {
      if (p.socket) {
        // await p.socket.join(room);
        p.socket.to(room).emit(ev, cb());
      }
    });
  }
  bind(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    list_queue.forEach((data) => {
      socket.on(data.queue, data.action(this, socket, this.lobbs));
    });
  }
}

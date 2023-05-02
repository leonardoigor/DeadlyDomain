import { _UserData } from "../app/user";
import { _Queue } from "./queues";

const list_queue: _Queue[] = [
  {
    queue: "setup_player",
    action: (q, socket) => (data: _UserData) => {
      data.socket = socket;
      q.addPlayer(data);
    },
  },
  {
    queue: "emit_new_player",
    action: (q, socket) => (data) => {
      q.broadcast(() => data, data.room, data.ev);
    },
  },
];

export default list_queue;

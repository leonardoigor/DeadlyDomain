import { _UserData } from "../app/user";
import { _Queue } from "./queues";

const list_queue: _Queue[] = [
  {
    queue: "setup_player",
    action: (q, socket, lobbies) => (data: _UserData) => {
      data.socket = socket;
      q.addPlayer(data);
      lobbies.setup_player(data);
    },
  },
  {
    queue: "emit_new_player",
    action: (q, socket) => (data) => {
      q.broadcast(() => data, data.room, data.ev);
    },
  },
  {
    queue: "find_lobby",
    action: (q, socket, lobbies) => async (data) => {
      const lobby = lobbies.find_lobby(data);
      if (lobby) {
        await socket.join(lobby.id);
        q.broadcast(() => lobby, lobby.id, "joined_room");
      }
    },
  },
];

export default list_queue;

import Lobby from "./lobby";
import { _UserData } from "./user";

export default class LobbyHandle {
  lobbies: Lobby[];

  constructor() {
    this.lobbies = [];
  }
  setup_player(user: _UserData) {}

  find_lobby(player: _UserData) {
    const lobby = this.lobbies.find((lobby) => lobby.is_open);
    if (lobby) {
      console.log("Lobby find ", lobby.id);

      lobby.users.push(player);
      return lobby;
    }
    return this.create_lobby(player);
  }
  create_lobby(player: _UserData) {
    const id = (Math.random() * 10000).toString();
    console.log("Lobby created " + id);

    const lobby = new Lobby(id);
    lobby.users.push(player);
    this.lobbies.push(lobby);
    return lobby;
  }
  remove_player_from_lobby(id: string) {
    const lobby = this.lobbies.find((lobby) =>
      lobby.users.some((e) => e.id == id)
    );
    if (!lobby) return;
    lobby.users = lobby.users.filter((e) => e.id != id);
    if (lobby.users.length == 0) {
      this.lobbies.splice(this.lobbies.indexOf(lobby), 1);
      console.log("Lobby id " + lobby.id + " was deleted");
    }
  }
}

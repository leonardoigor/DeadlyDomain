import User, { _UserData } from "./user";

class Lobby {
  id: string;
  users: _UserData[];
  started_at: Date;
  is_open: boolean;

  constructor(id: string) {
    this.id = id;
    this.users = [];
    this.started_at = new Date(Date.now());
    this.is_open = true;
  }
}

export default Lobby;

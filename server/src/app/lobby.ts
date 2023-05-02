import User from "./user";

class Lobby {
  id: string;
  users: User[];
  constructor(id: string) {
    this.id = id;
    this.users = [];
  }
}

export default Lobby;

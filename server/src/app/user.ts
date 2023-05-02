import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface _UserData {
  id: string;
  name: string;
  socket?: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  lat?: number;
  long?: number;
}
class User {
  _userData: _UserData;
  constructor(userData: _UserData) {
    this._userData = userData;
  }
}
export { _UserData };
export default User;

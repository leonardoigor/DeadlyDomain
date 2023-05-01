import express, { Express, json, urlencoded } from "express";

class Server {
  port: number;
  app: Express;
  constructor(port) {
    this.port = port;
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  setupRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Hello, World!");
    });
  }

  start(cb: () => {}) {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
      cb();
    });
  }
}
export default Server;

import { Server, Socket } from "socket.io";

export class SocketService {
  private io: Server;
  private socket: Socket | undefined;

  constructor(apiPort: number) {
    this.io = new Server(apiPort, { cors: { origin: "*" } });
    this.createConnection();
  }

  private createConnection() {
    this.io.on("connection", (socketIO) => {
      this.socket = socketIO;
    });
  }

  public emit(eventName: string, data: string) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }
}

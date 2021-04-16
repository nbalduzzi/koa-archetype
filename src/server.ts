import { Server } from 'http';
import { AddressInfo } from 'net';
import app from './app';

class ApiServer {
  server!: Server;

  listen = () => {
    const PORT = process.env.PORT || 3000;

    this.server = app.listen(PORT, async () => {
      console.log(`Starting in ${process.env.NODE_ENV} mode`);
      console.log(`Listening on ${PORT}`);
    });
  };

  close = () => this.server.close();
  address = () => this.server.address() as AddressInfo;
}

const server = new ApiServer();
server.listen();

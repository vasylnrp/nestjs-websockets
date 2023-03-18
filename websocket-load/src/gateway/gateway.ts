import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Hero } from "src/hero/hero";

@WebSocketGateway({
  cors: {
    origin: ["http://localhost:9000"]
  }
})
export class MyGateway implements OnModuleInit {

  private readonly heroes: Hero[] = [];

  getHeroes(): Hero[] {
    return this.heroes;
  }

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.heroes.push(new Hero(socket.id));
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() _: any) {
    // console.log({body});
      // this.server.emit('onMessage', {
      //   msg: 'New Message',
      //   content: body,
      // });
    // for (let i = 0; i < 9; i++) {
    //   this.server.emit('onMessage', {
    //     content: `number: ${i}`,
    //   });

    // }
    this.heroes.forEach((hero) => hero.healthImpact(Math.round(5 - Math.random() * 10)));
    this.heroes.forEach((hero) => {
      console.log('health emit');
      this.server.emit('onMessage', {
        content: `hero health: ${hero.getHealth()}`,
      });
    });
  }
}

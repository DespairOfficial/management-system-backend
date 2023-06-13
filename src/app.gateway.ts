import { UsersService } from './modules/users/users.service';
import { Conversation, Message } from '@prisma/client';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { MessageService } from './modules/chat/message/message.service';
import { UNAUTHORIZED } from './constants';
import { CreateMessageDto } from './modules/chat/message/dto/create-message.dto';
import { ConversationService } from './modules/chat/conversation/conversation.service';

const users: Record<string, string> = {};

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://despair.srrlab.ru',
  },

  //   serveClient: false,
  //   название пространства может быть любым, но должно учитываться на клиенте
  //   namespace: 'chat',
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService,
    private readonly usersService: UsersService,
  ) {}

  private getRoomNameForConversation = (conversationId: number) => {
    return `conversation-room-${conversationId}`;
  };

  private authGuard = (client: Socket) => {
    if (client.handshake.headers.authorization) {
      const bearer = client.handshake.headers.authorization.split(' ')[0];
      const token = client.handshake.headers.authorization.split(' ')[1];
      try {
        const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as any;
        if (user && bearer === 'Bearer') {
          return user;
        }
      } catch (err) {
        return false;
      }
    }
    return false;
  };

  @WebSocketServer() server: Server;

  // получение всех сообщений
  @SubscribeMessage('messages:get')
  async handleMessagesGet(client: Socket, data: string): Promise<Message[] | WsException> {
    const user = this.authGuard(client);
    if (user) {
      const messages = await this.messageService.findAll();
      // this.server.emit('messages', messages);
      return messages;
    } else {
      return new WsException(UNAUTHORIZED);
    }
  }

  // удаление всех сообщений
  @SubscribeMessage('messages:clear')
  async handleMessagesClear(): Promise<void> {
    await this.messageService.clear();
  }
  // создание сообщения
  @SubscribeMessage('message:post')
  async handleMessagePost(
    @MessageBody()
    payload: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ): Promise<Message | WsException | string> {
    const user = this.authGuard(client);

    if (user) {
      const createdMessage = await this.messageService.create(user.id, payload);
      const room = this.getRoomNameForConversation(payload.conversationId);
      this.server.to(room).emit('message:new', { ...createdMessage, conversationId: payload.conversationId });
      return createdMessage;
    } else {
      return new WsException(UNAUTHORIZED);
    }
  }

  @SubscribeMessage('conversations:get')
  async getMyConversations(
    @MessageBody()
    payload: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ): Promise<Conversation[] | WsException> {
    const user = this.authGuard(client);
    if (user) {
      const conversations = await this.conversationService.findByUser(user.id);
      return conversations;
    } else {
      return new WsException(UNAUTHORIZED);
    }
  }

  // обновление сообщения
  // @SubscribeMessage('message:put')
  // async handleMessagePut(
  //     @MessageBody()
  //     payload: // { id: number, text: string }
  //     MessageUpdatePayload,
  // ): Promise<void> {
  //     const updatedMessage = await this.appService.updateMessage(payload);
  //     this.server.emit('message:put', updatedMessage);
  // }

  // удаление сообщения
  // @SubscribeMessage('message:delete')
  // async handleMessageDelete(
  //     @MessageBody()
  //     payload: // { id: number }
  //     Prisma.MessageWhereUniqueInput,
  // ) {
  //     const removedMessage = await this.appService.removeMessage(payload);
  //     this.server.emit('message:delete', removedMessage);
  // }

  afterInit(server: Server) {}
  // обратите внимание на структуру объекта `handshake`
  async handleConnection(client: Socket, ...args: any[]) {
    const user = this.authGuard(client);
    console.log('USER:', user);

    if (user) {
      const userId = user.id;
      const socketId = client.id;
      users[socketId] = userId;
      const conversations = await this.conversationService.getUserOnConversation(user.id);
      const rooms = conversations.map((item) => {
        return this.getRoomNameForConversation(item.conversationId);
      });

      this.usersService.setOnlineStatus(userId, 'online');

      client.join(rooms);
      // передаем информацию всем клиентам, кроме текущего
      client.broadcast.emit('user:connected', userId);
    } else {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const socketId = client.id;
    const userId = users[socketId];
    this.usersService.setOnlineStatus(userId, 'offline');
    delete users[socketId];
    client.broadcast.emit('user:disconnected', userId);
  }
}

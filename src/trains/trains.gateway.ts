import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TrainsService } from './trains.service';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:3001', // URL вашего Next.js приложения
        methods: ['GET', 'POST'],
        credentials: true
    },
    path: '/socket.io', // Путь по умолчанию для socket.io
    transports: ['websocket'] // Используем только WebSocket (без long-polling)
})
export class TrainsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private readonly trainsService: TrainsService) { }

    afterInit() {
        console.log('Socket.IO сервер запущен');
    }

    handleConnection(client: Socket) {
        console.log(`Клиент подключен: ${client.id}`);
        client.emit('connection', { status: 'connected' });
    }

    handleDisconnect(client: Socket) {
        console.log(`Клиент отключен: ${client.id}`);
    }

    @SubscribeMessage('getTrains')
    async handleGetTrains(client: Socket) {
        try {
            const trains = await this.trainsService.getAll();
            // console.log('Отправляю поезда:', trains);
            client.emit('trains', trains);
            return { event: 'trains', data: trains };
        } catch (error) {
            console.error('Ошибка при получении поездов:', error);
            client.emit('error', { message: 'Failed to fetch trains' });
        }
    }
}
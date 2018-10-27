import * as WebSocket from 'ws';
import { Blockchain } from '../src/blockchain/blockchain';

const P2P_PORT: number = +process.env.P2P_PORT || 5001;
const peers : string[] = process.env.PEERS ? process.env.PEERS.split(',') : [];

export class P2PServer {

    sockets: WebSocket[];
    constructor(private blockchain: Blockchain) {
        this.sockets = [];
    }

    listen() {
        const server = new WebSocket.Server({port : P2P_PORT});
        //Let others connect here
        server.on('connection', socket => {
            this.connectSocket(socket);
            socket.on('close', () => this.removeSocket(socket));
        });

        //Connect to given peers.
        this.connectToPeers();
        console.log(`Listening for P2P connection on port: ${P2P_PORT}`);
    }


    ///Connect to all given peers
    connectToPeers(): void {
        peers.forEach(peer => {
            const socket = new WebSocket(peer);
            socket.on('open', () => this.connectSocket(socket)); //Wait for the wanted sockets to be opened and then connect
            socket.on('close', () => this.removeSocket(socket));
        });
    }

    ///Connect to given scoket
    connectSocket(socket: WebSocket): void {
        this.sockets.push(socket);
        console.log(`Socket connected: ${socket.url}`);
    }


    ///Remove disconnected socket
    removeSocket(socket: WebSocket): void {
        const index = this.sockets.indexOf(socket, 0);
        if(index > -1) {
            this.sockets.splice(index, 1);
            console.log(`removed socket: ${socket.url}`);
        }
    }
    
}
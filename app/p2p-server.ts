import * as WebSocket from 'ws';
import { Blockchain } from '../app/src/blockchain/blockchain';
import { createWriteStream } from 'fs';
import { BlockChainService } from '../app/src/blockchain/services/blockchain-service';
import { Block } from '../app/src/blockchain/block';

const P2P_PORT: number = +process.env.P2P_PORT || 5001;
const peers: string[] = process.env.PEERS ? process.env.PEERS.split(',') : [];

export class P2PServer {

    sockets: WebSocket[];
    constructor(private blockchain: Blockchain) {
        this.sockets = [];
    }

    listen() {
        const server = new WebSocket.Server({ port: P2P_PORT });
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
            socket.on('error', e => console.log(e));
            //Do nothing, peer is not able to be connected to.
        });
    }

    ///Connect to given scoket
    connectSocket(socket: WebSocket): void {
        this.sockets.push(socket);
        console.log(`Socket connected: ${socket.url}`);
        this.onMessageReceived(socket);
        this.sendChain(socket);
    }

    async sendChain(socket) {
        await socket.send(JSON.stringify(this.blockchain.chain));
    }


    ///Remove disconnected socket
    removeSocket(socket: WebSocket): void {
        const index = this.sockets.indexOf(socket, 0);
        if (index > -1) {
            this.sockets.splice(index, 1);
            console.log(`removed socket: ${socket.url}`);
        }
    }

    onMessageReceived(socket) {
        socket.on('message', message => {
            //Listen to given data from the connected socket.
            //Receivce a chain from the other nodes, try to replace it.
            const receivedBlockChain : Block[] = JSON.parse(message);
            console.log('data', receivedBlockChain);
            this.blockchain.chain = BlockChainService.getBestChain(this.blockchain.chain, receivedBlockChain);
        });
    }

    async syncChains() {
        await this.sockets.forEach(async s => await this.sendChain(s));
    }
}
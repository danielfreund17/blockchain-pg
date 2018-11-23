import { Block } from '../block';
import {SHA256} from 'crypto-js';
export class BlockService {
    static genesis() : Block {
        return new Block(new Date(0, 0, 0).getTime(), '-1', 'f123', '');
    }

    static mineBlock(lastBlock: Block, data: any) : Block {
        let timestamp : number = new Date().getTime();
        let lastHash = lastBlock.hash;
        let hash = this.createHash(timestamp, lastHash, data);

        return new Block(timestamp, lastHash, hash, data);
    }

    static createHash(timestamp : number, lastHash : string, data : any) : string {
        var hash = SHA256(`${timestamp}${lastHash}${data}`); 
        return hash.toString();
    }

    static getBlockHash(block : Block) : string {
        const {timestamp, prevHash, data} = block;
        return this.createHash(timestamp, prevHash, data);
    }
}
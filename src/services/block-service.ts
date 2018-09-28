import { Block } from '../block';
import {SHA256} from 'crypto-js';
export class BlockService {
    static genesis() {
        return new Block(new Date(0, 0, 0), '-1', 'f123', '');
    }

    static mineBlock(lastBlock: Block, data: any) {
        let timestamp : Date = new Date(Date.now());
        let lastHash = lastBlock.currentHash;
        let hash = this.createHash(timestamp, lastHash, data);

        return new Block(timestamp, lastHash, hash, data);
    }

    static createHash(timestamp : Date, lastHash : string, data : any) {
        return SHA256(`${timestamp + lastHash + data}`); //TODO-remove
    }
}
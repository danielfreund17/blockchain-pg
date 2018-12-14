import { Block } from '../block';
import { SHA256 } from 'crypto-js';
import { CONFIG } from '../../../config';

export class BlockService {

    static genesis(): Block {
        return new Block(new Date(0, 0, 0).getTime(), '-1', 'f123', '', 0, CONFIG.DIFFICULTY);
    }

    static mineBlock(lastBlock: Block, data: any): Block {
        let timestamp: number;
        let hash: string;
        let block: Block

        let lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0; //TODO- change later
        do {
            nonce++;
            timestamp = new Date().getTime();
            difficulty = BlockService.adjustDifficulty(lastBlock, timestamp)
            hash = this.createHash(timestamp, lastHash, data, nonce, difficulty);
        } while (!BlockService.foundExactAmountOfZeros(hash, difficulty));

        block = new Block(timestamp, lastHash, hash, data, nonce, difficulty);
        return block;
    }

    private static createHash(timestamp: number, lastHash: string, data: any, nonce: number, difficulty: number): string {
        var hash = SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`);
        return hash.toString();
    }

    static reGenerateBlockHash(block: Block): string {
        const { timestamp, prevHash, data, nonce, difficulty } = block;
        return this.createHash(timestamp, prevHash, data, nonce, difficulty);
    }

    private static foundExactAmountOfZeros(hash: string, difficulty: number): boolean {
        return hash.substring(0, difficulty) === '0'.repeat(difficulty);
    }

    private static adjustDifficulty(lastBlock: Block, currentTimeStamp: number): number {
        let { difficulty } = lastBlock;
        //We want to check if our block was mined to quickly, and if so, increase difficulty, else, decrease
        difficulty = lastBlock.timestamp + CONFIG.MINE_RATE > currentTimeStamp ?  difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}
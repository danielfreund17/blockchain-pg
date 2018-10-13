import {Block} from './block';
import {BlockService} from './services/block-service';

export class Blockchain {
    public chain : Block[];
    constructor() {
        this.chain = [];
        this.chain.push(BlockService.genesis());
    }

    addBlock(data: any) : Block {
        const newBlock = BlockService.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(newBlock);

        return newBlock;
    }
}
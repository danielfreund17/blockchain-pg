import {Block} from './block';
import {BlockService} from './services/block-service';

export class Blockchain {
    public chain : Block[];
    
    constructor() {
        this.chain = [];
        this.chain.push(BlockService.genesis());
    }
}
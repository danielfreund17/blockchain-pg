import { Block } from '../block';
import { BlockService } from '../services/block-service';
export class BlockChainService {

    static isChainValid(chain: Block[]): boolean {
        //Validate genesis
        if (JSON.stringify(chain[0]) !== JSON.stringify(BlockService.genesis())) {
            return false;
        }

        //Validate that no one overriden a block
        for (let i = 1; i < chain.length; i++) {
            let currentBlock = chain[i];
            let prevBlock = chain[i - 1];
            if (currentBlock.prevHash !== prevBlock.hash) {
                return false;
            }

            //Validate that no one changed a block data.
            if (JSON.stringify(currentBlock.hash) !== JSON.stringify(BlockService.getBlockHash(currentBlock))) {
                return false;
            }
        }

        return true;
    }

    static replaceChain(currentChain: Block[], newChain: Block[]): string {
        if((newChain.length <= currentChain.length) || !this.isChainValid(newChain)){ //Chain not long enough 
            return JSON.stringify(currentChain);
        }

        return JSON.stringify(newChain); //Replace the chain
    }
}
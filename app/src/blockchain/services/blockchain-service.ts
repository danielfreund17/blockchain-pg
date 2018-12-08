import { Block } from '../block';
import { BlockService } from '../services/block-service';
export class BlockChainService {

    static isChainValid(chain: Block[]): boolean {
        //Validate genesis
        if (JSON.stringify(chain[0]) !== JSON.stringify(BlockService.genesis())) {
            return false;
        }

        //Validate that no one overriden a block / changed the order of the block chain
        for (let i = 1; i < chain.length; i++) {
            let currentBlock = chain[i];
            let prevBlock = chain[i - 1];
            if (currentBlock.prevHash !== prevBlock.hash) {
                return false;
            }

            //Validate that no one changed a block data.
            var reGeneratedHash = BlockService.reGenerateBlockHash(currentBlock);
            if (currentBlock.hash.toString() !== reGeneratedHash.toString()) {
                return false;
            }
        }

        return true;
    }

    static getBestChain(currentChain: Block[], newChain: Block[]): Block [] {
        if((newChain.length <= currentChain.length) || !this.isChainValid(newChain)){ 
            //Chain not long enough 
            return currentChain;
        }

        return newChain; //Replace the chain
    }

    static addBlockToChain(data : any, chain : Block[]) : Block {
        const newBlock = BlockService.mineBlock(chain[chain.length-1], data);
        chain.push(newBlock);

        return newBlock;
    }
}
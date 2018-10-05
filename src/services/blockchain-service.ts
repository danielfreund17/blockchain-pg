import { Block } from '../block';
import { BlockService } from '../services/block-service';

export class BlockChainService {

    static isChainValid(chain: Block[]): boolean {
        //Validate genesis
        console.log(chain[0]);
        console.log(BlockService.genesis());
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
            console.log(`hash ${JSON.stringify(currentBlock.hash)}`);
            console.log(`hash ${JSON.stringify(BlockService.getBlockHash(currentBlock))}`);
            if (JSON.stringify(currentBlock.hash) !== JSON.stringify(BlockService.getBlockHash(currentBlock))) {
                return false;
            }
        }

        return true;
    }


}
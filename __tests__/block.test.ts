import { Block } from '../src/block';
import { BlockService } from '../src/services/block-service';
import { } from 'jasmine';

describe('Block', () => {

    let data, lastBlock: Block, block: Block;

    beforeEach(() => {
        data = 'test data';
        lastBlock = BlockService.genesis();
        block = BlockService.mineBlock(lastBlock, data);
    })
    it('sets the `data` to match the input', () => {
        expect(block.data).toEqual(data);
    });

    it('sets the `prevHash` to match the hash of the last block', () => {
        expect(block.prevHash).toEqual(lastBlock.hash);
    });
})
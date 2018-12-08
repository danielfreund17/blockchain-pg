import { Block } from '../app/src/blockchain/block';
import { BlockService } from '../app/src/blockchain/services/block-service';
import {CONFIG} from '../app/config';
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

    it('generates a hash that matches the difficulty', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
        console.log(block.toString());
    });
});
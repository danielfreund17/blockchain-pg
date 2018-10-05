import { Block } from '../src/block';
import { BlockService } from '../src/services/block-service';
import { Blockchain } from '../src/blockchain';
import { BlockChainService } from '../src/services/blockchain-service';
import { } from 'jasmine';


describe('Blockchain', () => {
    let blockchain: Blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('starts with genesis block', () => {
        expect(blockchain.chain[0]).toEqual(BlockService.genesis());
    });

    it('validates the chain', () => {
        blockchain.addBlock('newData');
        expect(BlockChainService.isChainValid(blockchain.chain)).toEqual(true);
    })
});
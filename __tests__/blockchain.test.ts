import { Block } from '../app/src/blockchain/block';
import { BlockService } from '../app/src/blockchain/services/block-service';
import { Blockchain } from '../app/src/blockchain/blockchain';
import { BlockChainService } from '../app/src/blockchain/services/blockchain-service';
import { } from 'jasmine';


describe('Blockchain', () => {
    let blockchain: Blockchain;
    let blockchain2: Blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
    });

    it('starts with genesis block', () => {
        expect(blockchain.chain[0]).toEqual(BlockService.genesis());
    });

    it('validates the chain', () => {
        BlockChainService.addBlockToChain('newData', blockchain.chain);
        BlockChainService.addBlockToChain('anotherData', blockchain.chain);
        expect(BlockChainService.isChainValid(blockchain.chain)).toEqual(true);
    });

    it('validates that corrupt genesis returns false', () => {
        blockchain2.chain[0].data = "different data";
        expect(BlockChainService.isChainValid(blockchain2.chain)).toEqual(false);
    });

    it('validates that any corrupt block returns false', () => {
        BlockChainService.addBlockToChain('Foo', blockchain2.chain);
        blockchain2.chain[1].data = 'Other data';
        expect(BlockChainService.isChainValid(blockchain2.chain)).toEqual(false);
    });

    it('Expects a new chain to replace the current chain', () => {
        BlockChainService.addBlockToChain('test', blockchain2.chain);
        let expectedNewChain = JSON.stringify(blockchain2.chain);
        expect(JSON.stringify(BlockChainService.getBestChain(blockchain.chain, blockchain2.chain))).toEqual(expectedNewChain);
    });

    it('Expects not to replace the chain', () => {
        BlockChainService.addBlockToChain('block', blockchain.chain);
        BlockChainService.addBlockToChain('block2', blockchain2.chain);
        let expectedChain = JSON.stringify(blockchain.chain);
        expect(JSON.stringify(BlockChainService.getBestChain(blockchain.chain, blockchain2.chain))).toEqual(expectedChain);
    });
});
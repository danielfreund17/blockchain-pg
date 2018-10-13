import { Block } from '../src/blockchain/block';
import { BlockService } from '../src/blockchain/services/block-service';
import { Blockchain } from '../src/blockchain/blockchain';
import { BlockChainService } from '../src/blockchain/services/blockchain-service';
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
        blockchain.addBlock('newData');
        expect(BlockChainService.isChainValid(blockchain.chain)).toEqual(true);
    });

    it('validates that corrupt genesis returns false', () => {
        blockchain2.chain[0].data = "different data";
        expect(BlockChainService.isChainValid(blockchain2.chain)).toEqual(false);
    });

    it('validates that any corrupt block returns false', () => {
        blockchain2.addBlock('Foo');
        blockchain2.chain[1].data = 'Other data';
        expect(BlockChainService.isChainValid(blockchain2.chain)).toEqual(false);
    });

    it('Expects a new chain to replace the current chain', () => {
        blockchain2.addBlock('test');
        let expectedNewChain = JSON.stringify(blockchain2.chain);
        expect(BlockChainService.replaceChain(blockchain.chain, blockchain2.chain)).toEqual(expectedNewChain);
    });

    it('Expects not to replace the chain', () => {
        blockchain.addBlock('block');
        blockchain2.addBlock('block2');
        let expectedChain = JSON.stringify(blockchain.chain);
        expect(BlockChainService.replaceChain(blockchain.chain, blockchain2.chain)).toEqual(expectedChain);
    });
});
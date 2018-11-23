import {Blockchain} from '../src/blockchain/blockchain';
import {BlockChainService} from '../src/blockchain/services/blockchain-service';
import {Block} from '../src/blockchain/block';
import {BlockService} from '../src/blockchain/services/block-service';
import {App} from '../app/app';
import {P2PServer} from '../app/p2p-server';


const HTTP_PORT = +process.env.HTTP_PORT  || 3001;
const app = new App().express;
const blockchain : Blockchain = new Blockchain();
const p2pServer : P2PServer = new P2PServer(blockchain);


app.listen(HTTP_PORT, (err) => {
    if(err) {
        console.log(err);
    }

    return console.log(`Server listening on port ${HTTP_PORT}`);
});


app.post('/mine', async (req, res) => {
    const block = await BlockChainService.addBlockToChain(req.body.data, blockchain.chain);
    console.log(`New block added: ${block.toString()}`);
    await p2pServer.syncChains();
    res.redirect('/blocks');
});
app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});


process.on('uncaughtException', err => {
    console.log(err);
});

p2pServer.listen();
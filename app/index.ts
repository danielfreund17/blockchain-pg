import * as bodyParser from 'body-parser';
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


app.use(bodyParser.json());
app.listen(HTTP_PORT, (err) => {
    if(err) {
        console.log(err);
    }

    return console.log(`Server listening on port ${HTTP_PORT}`);
});


app.post('/mine', (req, res) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
});
app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

p2pServer.listen();
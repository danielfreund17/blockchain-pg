import { CONFIG } from "../../config";
import { ChainUtil } from "../../chainUtil";
import * as EC from 'elliptic';

export class Wallet {
    private keyPair: EC.ec.KeyPair;
    public readonly publicKey: string;
    public balance: number;

    constructor() {
        this.balance = CONFIG.INITIAL_AMOUNT;
        this.keyPair = ChainUtil.generateKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `Wallet- 
        Public Key: ${this.publicKey},
        Amount    : ${this.balance}`;
    }
}
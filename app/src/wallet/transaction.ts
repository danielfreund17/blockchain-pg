import { ChainUtil } from "../../chainUtil";
import * as ECManager from 'elliptic';
import { Wallet } from ".";


type OutputTransaction = {
    amount: number,
    address: string
};

type InputTransaction = {
    timestamp: number,
    senderAmount: number,
    senderAddress: string,
    receiverAddress: string,
    signature: string
}

export class Transaction {
    public readonly id: string;
    public input: InputTransaction;
    public readonly outputs: OutputTransaction[];

    constructor() {
        this.id = ChainUtil.createID();
        this.input = null;
        this.outputs = [];
    }
}
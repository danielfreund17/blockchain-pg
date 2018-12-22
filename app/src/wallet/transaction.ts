import { ChainUtil } from "../../chainUtil";
import { Wallet } from ".";


type outputTransaction = {
    amount: number,
    address: string
};

export class Transaction {
    public readonly id: string;
    private input: any;
    public readonly outputs: outputTransaction[];

    constructor() {
        this.id = ChainUtil.createID();
        this.input = null;
        this.outputs = [];
    }


    static createTransaction(senderWallet: Wallet, receiverWallet: Wallet, amountToDeliver: number) {
        let transaction = new this();

        if (amountToDeliver > senderWallet.balance) {
            console.log(`not enough amount of money. Amount: ${amountToDeliver}`); //TODO- handle this error better
        }

        transaction.outputs.push(...[
            { amount: senderWallet.balance - amountToDeliver, address: senderWallet.publicKey }, //Sender
            { amount: amountToDeliver, address: receiverWallet.publicKey } //Receiver
        ]);

        senderWallet.balance -= amountToDeliver;
        receiverWallet.balance += amountToDeliver;

        return transaction;
    }
}
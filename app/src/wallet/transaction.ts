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

    static addTransactionToExisting(transaction: Transaction, senderWallet: Wallet, receiverWallet: Wallet, amount: number) {
        const senderOutput = transaction.outputs.find(t => t.address === senderWallet.publicKey);
        if (amount === undefined || amount > senderOutput.amount) {
            throw 'unvalid amount for transaction!'
        }

        senderOutput.amount -= amount;
        transaction.outputs.push({ amount: amount, address: receiverWallet.publicKey });
        Transaction.signTransaction(transaction, senderWallet, receiverWallet);

        return transaction;
    }

    static createTransaction(senderWallet: Wallet, receiverWallet: Wallet, amountToDeliver: number): Transaction {
        let transaction = new this();

        if (amountToDeliver === undefined || amountToDeliver > senderWallet.balance) {
            throw `Not enough amount of money for transaction! Amount: ${amountToDeliver}`;
        }

        transaction.outputs.push(...[
            { amount: senderWallet.balance - amountToDeliver, address: senderWallet.publicKey }, //Sender (updated balance of sendet as amount)
            { amount: amountToDeliver, address: receiverWallet.publicKey } //Receiver (amount deliverd as amount)
        ]);


        //TODO atomic
        senderWallet.balance -= amountToDeliver;
        receiverWallet.balance += amountToDeliver;

        Transaction.signTransaction(transaction, senderWallet, receiverWallet);
        return transaction;
    }

    static verifyTransactionSignature(transaction: Transaction, senderWallet: Wallet, receiverWallet: Wallet) {
        return ChainUtil.verifySignature(
            transaction.input.signature,
            `${senderWallet.publicKey}${receiverWallet.publicKey}`);
    }

    private static signTransaction(transaction: Transaction, senderWallet: Wallet, receiverWallet: Wallet) {
        transaction.input = {
            senderAddress: senderWallet.publicKey,
            receiverAddress: receiverWallet.publicKey,
            senderAmount: senderWallet.balance,
            timestamp: Date.now(),
            signature: ChainUtil.createSignature(`${senderWallet.publicKey}${receiverWallet.publicKey}`)
        };
    }
}
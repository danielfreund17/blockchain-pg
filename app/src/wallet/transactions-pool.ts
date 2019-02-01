import { Transaction } from "./transaction";
import { Wallet } from ".";
import { ChainUtil } from "../../chainUtil";

export class TransactionsPool {
    private static transactionsPool: Transaction[] = TransactionsPool.InitPool();
    static InitPool(): Transaction[] {
        this.transactionsPool = [];
        return this.transactionsPool;
    }
    constructor() {
    }

    public static createOrUpdateTransaction(senderWallet: Wallet, receiverWallet: Wallet, amount: number): Transaction {
        let signature = ChainUtil.createSignature(`${senderWallet.publicKey}${receiverWallet.publicKey}`);
        let transaction = this.transactionsPool.find(t => t.input.signature === signature);
        if (transaction) {
            this.addTransactionToExisting(transaction, senderWallet, receiverWallet, amount);
            return transaction;
        } else {
            let newCreatedTrans = this.createTransaction(senderWallet, receiverWallet, amount);
            this.transactionsPool.push(newCreatedTrans);
            return newCreatedTrans;
        }
    }

    public static getCountOfTransatcions() {
        return this.transactionsPool.length;
    }

    public static getTransactionIfExists(senderWallet: Wallet, receiverWallet: Wallet): Transaction {
        let signature = ChainUtil.createSignature(`${senderWallet.publicKey}${receiverWallet.publicKey}`);
        let transaction = this.transactionsPool.find(t => t.input.signature === signature);
        return transaction ? Object.assign({}, transaction) : undefined;
    }


    static addTransactionToExisting(transaction: Transaction, senderWallet: Wallet, receiverWallet: Wallet, amount: number) {
        const senderOutput = transaction.outputs.find(t => t.address === senderWallet.publicKey);
        if (amount === undefined || amount > senderOutput.amount) {
            throw 'unvalid amount for transaction!'
        }

        senderOutput.amount -= amount;
        transaction.outputs.push({ amount: amount, address: receiverWallet.publicKey });
        this.signTransaction(transaction, senderWallet, receiverWallet);

        return transaction;
    }


    private static createTransaction(senderWallet: Wallet, receiverWallet: Wallet, amountToDeliver: number): Transaction {
        let transaction = new Transaction();

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

        this.signTransaction(transaction, senderWallet, receiverWallet);
        return transaction;
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

    static verifyTransactionSignature(transaction: Transaction, senderWallet: Wallet, receiverWallet: Wallet) {
        return ChainUtil.verifySignature(
            transaction.input.signature,
            `${senderWallet.publicKey}${receiverWallet.publicKey}`);
    }
}
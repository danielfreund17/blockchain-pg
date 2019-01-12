import { Transaction } from "./transaction";
import { Wallet } from ".";
import { ChainUtil } from "../../chainUtil";

export class TransactionsPool {

    private readonly transactionsPool: Transaction[];
    constructor() {
        this.transactionsPool = [];
    }

    createOrUpdateTransaction(senderWallet: Wallet, receiverWallet: Wallet, amount: number) {
        let signature = ChainUtil.createSignature(`${senderWallet.publicKey}${receiverWallet.publicKey}`);
        let transaction = this.transactionsPool.find(t => t.input.signature === signature);
        if (transaction) {
            Transaction.addTransactionToExisting(transaction, senderWallet, receiverWallet, amount);
        } else {
            let newCreatedTrans = Transaction.createTransaction(senderWallet, receiverWallet, amount);
            this.transactionsPool.push(newCreatedTrans);
        }
    }

    getCountOfTransatcions() {
        return this.transactionsPool.length;
    }

    getTransactionIfExists(senderWallet: Wallet, receiverWallet: Wallet): Transaction {
        let signature = ChainUtil.createSignature(`${senderWallet.publicKey}${receiverWallet.publicKey}`);
        let transaction = this.transactionsPool.find(t => t.input.signature === signature);
        return transaction ? Object.assign({}, transaction) : undefined;
    }
}
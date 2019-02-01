import { Wallet } from '../app/src/wallet';
import { ChainUtil } from '../app/chainUtil';
import { Transaction } from '../app/src/wallet/transaction';
import { TransactionsPool } from '../app/src/wallet/transactions-pool';
import * as ECManager from 'elliptic';
import * as UUIDManager from 'uuid';
import { timingSafeEqual } from 'crypto';

import { } from 'jasmine';


describe('Transaction', () => {
    ChainUtil.Initialize();
    let transactionsPool: TransactionsPool
    let transaction: Transaction;
    let senderWallet: Wallet;
    let receiverWallet: Wallet;
    let amount: number;
    let receiverAmountBeforeTransaction: number;
    let senderAmountBeforeTransaction: number;


    beforeAll(() => {
        senderWallet = new Wallet();
        receiverWallet = new Wallet();
        receiverAmountBeforeTransaction = receiverWallet.balance
        senderAmountBeforeTransaction = senderWallet.balance;
        amount = 10;
        transaction = TransactionsPool.createOrUpdateTransaction(senderWallet, receiverWallet, amount);
    });

    it('outputs the `amount` subtracted from the wallet balance', () => {
        expect(
            transaction.outputs.find(t => t.address === senderWallet.publicKey).amount
        ).toEqual(senderAmountBeforeTransaction - amount);
    });

    it('outputs the `amount` added to the receiver', () => {
        expect(
            transaction.outputs.find(t => t.address === receiverWallet.publicKey).amount + receiverAmountBeforeTransaction
        ).toEqual(receiverWallet.balance);
    });

    it('verifes that wrong amount wont execute transaction', () => {
        let newAmount = 5000;
        const func = () => {
            TransactionsPool.createOrUpdateTransaction(senderWallet, receiverWallet, newAmount);
        };
        expect(func).toThrow();
    });

    it('verifies the input transaction (signature)', () => {
        expect(transaction.input.senderAmount).toEqual(senderWallet.balance);
    });

    it('validates transaction', () => {
        expect(TransactionsPool.verifyTransactionSignature(transaction, senderWallet, receiverWallet)).toBe(true);
    });

    it('verifies that a new transaction is added to pool', () => {
        let newTransaction = TransactionsPool.createOrUpdateTransaction(senderWallet, receiverWallet, amount);
        expect(TransactionsPool.getCountOfTransatcions()).toEqual(1);
    });

    it('verifies that a transaction of same sender to receiver will be updated instead of being created', () => {
        let newTransaction = TransactionsPool.createOrUpdateTransaction(senderWallet, receiverWallet, amount);
        expect(TransactionsPool.getCountOfTransatcions()).toEqual(1);
    });

    it('expects to find transaction in transaction pool', () => {
        expect(TransactionsPool.getTransactionIfExists(senderWallet, receiverWallet)).not.toEqual(undefined);
    });

    it('expects not to find transaction in transaction pool', () => {
        let sender = new Wallet();
        let receiver = new Wallet();
        expect(TransactionsPool.getTransactionIfExists(sender, receiver)).toEqual(undefined);
    });
});
import { Wallet } from '../app/src/wallet';
import { ChainUtil } from '../app/chainUtil';
import { Transaction } from '../app/src/wallet/transaction';
import * as ECManager from 'elliptic';
import * as UUIDManager from 'uuid';
import { timingSafeEqual } from 'crypto';

import { } from 'jasmine';


describe('Transaction', () => {
    ChainUtil.Initialize();
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
        amount = 50;
        transaction = Transaction.createTransaction(senderWallet, receiverWallet, amount);
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

    it('verifies the input transaction (signature)', () => {
        expect(transaction.input.senderAmount).toEqual(senderWallet.balance);
    });

    it('validates transaction', () => {
        expect(Transaction.verifyTransactionSignature(transaction, senderWallet, receiverWallet)).toBe(true);
    })
});
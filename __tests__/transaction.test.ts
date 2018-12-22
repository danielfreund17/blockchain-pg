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

    beforeEach(() => {
        senderWallet = new Wallet();
        receiverWallet = new Wallet();
        transaction = Transaction.createTransaction(senderWallet, receiverWallet, amount);
        amount = 50;
    });

    it('outputs the `amount` subtracted from the wallet balance', () => {
        expect(
            transaction.outputs.find(t => t.address === senderWallet.publicKey).amount
        ).toEqual(senderWallet.balance - amount);
    });
});
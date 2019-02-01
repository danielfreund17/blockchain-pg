import { Wallet } from "./src/wallet";
import { ChainUtil } from "./chainUtil";
import { Transaction } from "./src/wallet/transaction";
import { TransactionsPool } from "./src/wallet/transactions-pool";

ChainUtil.Initialize();
let transaction: Transaction;
let senderWallet: Wallet;
let receiverWallet: Wallet;
let amount: number;

senderWallet = new Wallet();
receiverWallet = new Wallet();
amount = 50;
transaction = TransactionsPool.createOrUpdateTransaction(senderWallet, receiverWallet, amount);
var t = transaction.outputs.find(t => t.address === senderWallet.publicKey).amount


console.log(senderWallet);
import { Wallet } from "./src/wallet";
import { ChainUtil } from "./chainUtil";
import { Transaction } from "./src/wallet/transaction";

ChainUtil.Initialize();
let transaction: Transaction;
let senderWallet: Wallet;
let receiverWallet: Wallet;
let amount: number;

senderWallet = new Wallet();
receiverWallet = new Wallet();
amount = 50;
transaction = Transaction.createTransaction(senderWallet, receiverWallet, amount);
var t = transaction.outputs.find(t => t.address === senderWallet.publicKey).amount


console.log(senderWallet);
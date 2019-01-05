import * as ECManager from 'elliptic';
import * as UUIDManager from 'uuid';
import { SHA256 } from 'crypto-js';
import { timingSafeEqual } from 'crypto';

export class ChainUtil {
    private static elliptic: ECManager.ec;

    static Initialize() {
        this.elliptic = new ECManager.ec('secp256k1');
    }

    static generateKeyPair(): ECManager.ec.KeyPair {
        return this.elliptic.genKeyPair(); // generates private and public key
    }

    static createID(): string {
        return UUIDManager.v1();
    }

    static createSignature(data: any) {
        var hash = SHA256(JSON.stringify(data));
        return hash.toString();
    }


    static verifySignature(signature: string, dataHash: any) {
        console.log(this.createSignature(dataHash));
        console.log(signature);
        return this.createSignature(dataHash) === signature;
    }
}

import * as ECManager from 'elliptic';
import * as UUIDManager from 'uuid';
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
}

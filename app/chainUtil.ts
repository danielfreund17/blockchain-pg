import * as EC from 'elliptic';
import { timingSafeEqual } from 'crypto';

export class ChainUtil {
    private static elliptic: EC.ec;

    static Initialize() {
        this.elliptic = new EC.ec('secp256k1');
    }

    static generateKeyPair(): EC.ec.KeyPair {
        return this.elliptic.genKeyPair(); // generates private and public key
    }
}
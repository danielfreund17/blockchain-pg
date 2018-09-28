export class Block {
    constructor (private timestamp : Date, private prevHash : string, private hash : string, private data : any) {}

    get lastHash() {
        return this.prevHash;
    }

    get currentHash() {
        return this.hash;
    }

    get blockData() {
        return this.data;
    }

    toString() {
        return `Block - 
        TimeStamp : ${this.timestamp}
        LastHash  : ${this.prevHash}
        Hash      : ${this.hash}
        Data      : ${this.data}`;
    }
}

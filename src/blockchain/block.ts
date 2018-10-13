export class Block {
    constructor (public timestamp : Date, public prevHash : string, public hash : string, public data : any) {}


    toString() {
        return `Block - 
        TimeStamp : ${this.timestamp}
        LastHash  : ${this.prevHash}
        Hash      : ${this.hash}
        Data      : ${this.data}`;
    }
}

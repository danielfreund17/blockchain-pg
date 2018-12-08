import { CONFIG } from "../../config";

export class Block {
    constructor (public timestamp : number, public prevHash : string, public hash : string, public data : any, 
    public nonce : number, public difficulty : number) {}


    toString() {
        var date : Date = new Date(this.timestamp);
        return `Block - 
        TimeStamp : ${date}
        LastHash  : ${this.prevHash}
        Hash      : ${this.hash}
        Data      : ${this.data}
        Difficulty: ${this.difficulty}
        Nonce     : ${this.nonce}`;
    }
}

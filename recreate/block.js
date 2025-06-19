const {GENESIS_DATA} = require("./config");
const cryptoHash = require("./crypto-hash");

class Block{
    constructor({timestamp, prevHash , hash,  data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }

    static genesis(){
       return new this (GENESIS_DATA);
    }
static mining({prevBlock, data}){
        const timestamp = Date.now();
        const prevHash = prevBlock.hash;
        return new this({
            timestamp, prevHash, hash: cryptoHash(timestamp, prevHash, data), data
        }) 
        
    }
}



console.log(Block.mining({prevBlock:GENESIS_DATA, data:"HELO"}));



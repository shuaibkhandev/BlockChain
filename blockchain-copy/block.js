const cryptoHash = require("../crypto-hash");
const { hash } = require("../GenesisBlock");
const GENESIS_DATA = require("./GenesisBlock");

class Block{
    constructor({timestamp, data, hash="", prevHash=""}){
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
        this.prevHash = prevHash;
    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    static miningBlock({prevBlock, data}){
        const timestamp = Date.now();
        const prevHash = prevBlock.hash;
        const hash = cryptoHash(timestamp, data, prevHash);

        return new this ({
            timestamp,
            data,
            prevHash,
            hash
        })
    }
}


module.exports = Block;

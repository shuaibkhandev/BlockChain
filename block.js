const GENESIS_DATA = require('./GenesisBlock.js');
const cryptoHash = require('./crypto-hash.js');
class Block {
    constructor({timestamp, data, previousHash = '', hash = ''}){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = hash;
    }

    static genesis() { 
        return new this(GENESIS_DATA);
    }

    

    static miningBlock({prevBlock, data}){
        const timestamp = Date.now();
        const previousHash = prevBlock.hash;
        const hash = cryptoHash(timestamp, previousHash, data);
        return new this({
            timestamp,
            data,
            previousHash,
            hash
        });
    }
}
module.exports = Block;

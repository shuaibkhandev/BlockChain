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
}


const genesisBlock = Block.genesis();
console.log(genesisBlock);
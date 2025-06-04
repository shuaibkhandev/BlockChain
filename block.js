const GENESIS_DATA = require('./GenesisBlock.js');
const cryptoHash = require('./crypto-hash.js');
class Block {
    constructor({timestamp, data, previousHash = '', hash = '', nonce, difficulity}){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulity = difficulity;
    }

    static genesis() { 
        return new this(GENESIS_DATA);
    }

    

    static miningBlock({prevBlock, data}){
        let hash, timestamp;
        const previousHash = prevBlock.hash;
        let nonce = prevBlock.nonce;
        const difficulity = prevBlock.difficulity;

        do{
            nonce ++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, previousHash, data, nonce, difficulity)
        }while(hash.substring(0, difficulity) !== '0'.repeat(difficulity))

        return new this({
            timestamp,
            data,
            previousHash,
            hash,
            nonce, difficulity
        });
    }
}
module.exports = Block;

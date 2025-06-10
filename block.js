const GENESIS_DATA = require('./GenesisBlock.js');
const { MINE_RATE } = require('./config.js');
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
        let {difficulity} = prevBlock;
        do{
            nonce ++;
            timestamp = Date.now();
            difficulity = Block.adjustDifficulity({originalBlock : prevBlock, timestamp})
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

    static adjustDifficulity({originalBlock, timestamp}){
        let {difficulity} = originalBlock;
        if(difficulity < 1) return 1;
        const difference = timestamp - originalBlock.timestamp;
 
        
        if(difference > MINE_RATE) return difficulity -1;
        return difficulity + 1;
    }
}
module.exports = Block;

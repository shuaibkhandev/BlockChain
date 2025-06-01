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

const block1 = new Block({
        timestamp: '01/01/2023',
        data: 'Block 1 Data',
        previousHash: '0000',
        hash: '1234abcd'
    });


const block2 = Block.miningBlock({prevBlock: block1, data: '500 coins to Alice'});
console.log("Block 2:",block2);
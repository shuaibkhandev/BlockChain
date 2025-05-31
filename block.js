"Welcome to Blockchain"

class Block {
    constructor({timestamp, data, previousHash = '', hash = ''}){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = hash;
    }
}


const genesisBlock = new Block({
    timestamp: '01/01/2025',      
    data: {
        amount: 50
    },
    previousHash: '',
    hash: '000'
    });
    
const block1 = new Block({
    timestamp: '02/01/2025',
    data: {
        amount: 100
    },
    previousHash: genesisBlock.hash,
    hash: '001'
});

console.log(genesisBlock);
console.log(block1);
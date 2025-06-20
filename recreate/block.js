const {GENESIS_DATA, MINIE_RATE} = require("./config");
const cryptoHash = require("./crypto-hash");

class Block{
    constructor({timestamp, prevHash , hash, difficulity, nonce, data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.difficulity = difficulity;
        this.nonce = nonce
        this.data = data;
    }

    static genesis(){
       return new this (GENESIS_DATA);
    }
static mining({prevBlock, data}){
        let hash, timestamp, nonce;
        let {difficulity} = prevBlock ;
        const prevHash = prevBlock.hash;
        nonce = 0;
        do{
        nonce++;
        timestamp = Date.now();
        difficulity = Block.adjustDifficulity({orignalBlock:prevBlock, timestamp})
        console.log(difficulity);
        
        hash = cryptoHash(timestamp, prevHash, nonce, difficulity, data)
        }while(hash.substring(0,difficulity) !== "0".repeat(difficulity))
        return new this({
            timestamp, prevHash, nonce, difficulity, hash, data
        }) 
    }

   static adjustDifficulity({orignalBlock, timestamp}){
        let {difficulity} = orignalBlock;
        if(difficulity < 1) return 1;
        const difference = timestamp - orignalBlock.timestamp;
        if(difference > MINIE_RATE)    return difficulity - 1;
        return difficulity + 1;
    }
}


module.exports = Block;


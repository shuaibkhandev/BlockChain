const { GENESIS_DATA, MINE_RATE } = require("./config");
const CryptoHash = require("./crypto-hash");

class Block{
    constructor({timestamp, prevHash, hash, nonce, difficulity, data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulity = difficulity;
        this.data = data;
    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({prevBlock, data}){
      let timestamp, hash;
      
      const prevHash = prevBlock.hash;
      let {difficulity} = prevBlock;
      let nonce = 0;
      do{
        nonce++;
        timestamp = Date.now();
        difficulity = Block.addjustDifficulity({orignalBlock:prevBlock, timestamp})
        hash =  CryptoHash(timestamp, prevHash, nonce, difficulity, data);
      }while(hash.substring(0, difficulity) !== "0".repeat(difficulity));


      return new this ({
        timestamp : timestamp,
        prevHash : prevHash,
        hash :hash,
        nonce:nonce,
        difficulity:difficulity,
        data: data
      })
    }

    static addjustDifficulity({orignalBlock, timestamp}){
 
      
        let {difficulity} = orignalBlock;
console.log(difficulity);

        if(difficulity < 1) return 1;
        let difference = timestamp - orignalBlock.timestamp ;

        if(difference > MINE_RATE) difficulity - 1;
        return difficulity+1;
    }
}



module.exports = Block;
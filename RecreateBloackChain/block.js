const { nonce } = require("../GenesisBlock");
const {GENESIS_DATA} = require("./config");
const createHash = require("./crypto-hash");

class Block{
    constructor({timestamp, prevHash, hash, nonce , difficulity , data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulity = difficulity;
        this.data = data;
    }

    static genesis(){
      return new this(GENESIS_DATA)
    }

    static miningBlock({prevBlock, data}){
      let timestamp, hash;
      const prevHash = prevBlock.hash;
      let {difficulity} = prevBlock;
      let nonce = 0;
      do{
        nonce++
        timestamp = Date.now();
        hash = createHash(timestamp, prevHash, difficulity, nonce, data);
      }while(hash.substring(0, difficulity) !== '0'.repeat(difficulity))
      return new this({
      timestamp, prevHash, difficulity, nonce, hash, data
      })
    }
}

module.exports = Block
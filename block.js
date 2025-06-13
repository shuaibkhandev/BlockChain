const { MINE_RATE } = require("./config");
const {GENESIS_DATA} = require("./config");
const createHash = require("./crypto-hash");
const hexToBinary = require("hex-to-binary");

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
        difficulity =  Block.adjustDifficulity({originalBlock:prevBlock, timestamp})
        hash = createHash(timestamp, prevHash, difficulity, nonce, data);
      }while( hexToBinary(hash).substring(0, difficulity) !== '0'.repeat(difficulity))
      return new this({
      timestamp, prevHash, difficulity, nonce, hash, data
      })
    }
    
static adjustDifficulity({ originalBlock, timestamp }) {
  let { difficulity } = originalBlock;
  if (difficulity < 1) return 1;

  const difference = timestamp - originalBlock.timestamp;

  if (difference > MINE_RATE) return difficulity - 1;
  return difficulity + 1;
}

}

module.exports = Block
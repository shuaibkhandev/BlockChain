const Block = require("./block");
const cryptoHash = require("./crypto-hash");
const { timestamp, previousHash, hash } = require("./GenesisBlock");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.miningBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
    return newBlock;
  }

  replaceChain(chain){
    if(chain <= this.chain.length){
      console.error('The incomming chain is not longer');
      return;
    }

    if(!Blockchain.isValidChain(chain)){
      console.error("The incomming chain is not valid");
      return;
    }
    this.chain = chain;
  }

  static isValidChain(chain){

 if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))  return false


    for(let i = 1; i<chain.length; i++){
      const {timestamp, previousHash, hash, data, nonce, difficulity} = chain[i];
      const realLastHash = chain[i-1].hash;
      
      if(previousHash!==realLastHash) return false

      const validatedHash = cryptoHash(timestamp, previousHash, data, nonce, difficulity);
      if(hash !== validatedHash) return false;

    }



    return true;
  }
}

const blockchain = new Blockchain();
blockchain.addBlock({ data: "first block" });
blockchain.addBlock({ data: "second block" });



console.log(blockchain);





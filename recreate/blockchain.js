const Block = require("./block");
const cryptoHash = require("./crypto-hash");


class BlockChain {
    constructor(chain){
        this.chain = [Block.genesis()]
    }

    addBlock({data}){
        const newBlock = Block.mining({
            prevBlock : this.chain[this.chain.length-1],
            data
        })
        this.chain.push(newBlock)
    }

     replaceChain(chain){
    if(chain.length < this.chain.length){
        console.error("The incoming chain is not longer.");
        return false;
    }
    if(!BlockChain.isValidChain(chain)){
        console.error("The incoming chain is not valid.");
        return false;
        
    }    
    this.chain = chain;
    }

   static isValidChain(chain){
  if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
    return false;
  }

  for(let i=1; i<chain.length; i++){
    const {timestamp, prevHash, hash, data} = chain[i];

    const realHash = chain[i-1].hash;

    if(prevHash !== realHash){
        return false;
    }
    
    const validatedHash = cryptoHash(timestamp, prevHash, data);
    if(hash !== validatedHash){
        return false
    }
    
    return true;
  }

   }
}

const blockchain = new BlockChain();
 blockchain.addBlock({data:"HELLO"})
 blockchain.addBlock({data:"WORLD"})




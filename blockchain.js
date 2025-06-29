const Block = require("./block");
const CryptoHash = require("./crypto-hash");



class BlockChain{
    constructor(){
        this.chain = [Block.genesis()]
    }

    addBlock({data}){
       const newBlock = Block.mineBlock({
            prevBlock : this.chain[this.chain.length-1],
            data : data
        })
        this.chain.push(newBlock)
    }

       replaceChain(chain){
        if(chain.length <= this.chain.length){
        console.error("The incomming chain is not longer");
        return false;
        }

        if(!BlockChain.isValidChain(chain)){
            console.error("The incomming chain is not valid");
            return false;
        }
        this.chain = chain;
    }

    static isValidChain(chain){
      if( JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
      
      for(let i=1; i<chain.length; i++){
       const {timestamp, prevHash, hash, data, nonce, difficulity} = chain[i];
       
       const realLastHash = chain[i-1].hash;
       const lastDifficulity = chain[i-1].difficulity;
       if(prevHash !== realLastHash) return false;
       const validatedHash = CryptoHash(timestamp, prevHash, nonce, difficulity, data);
       
       if (hash !== validatedHash)  return false;
       
       if(Math.abs(lastDifficulity-difficulity)>1) return false;     

      }
      
    console.log(`✅ PORT ${process.env.PORT}: Chain replaced successfully`);
      return true
    }

  
}




module.exports = BlockChain;
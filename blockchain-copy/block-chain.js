const Block = require("./block");



class BlockChain{
    constructor(){
        this.chain = [Block.genesis()]
    }

    addBlock({data}){
        const newBlock = Block.miningBlock({
            prevBlock : this.chain[this.chain.length-1],
            data
        })
        this.chain.push(newBlock);
        return newBlock;
    }

    static isValidChain(chain){
        
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))  return false;

        for(let i=1; i<chain.length; i++){
            const {timestamp, data, hash, prevHash} = chain[i]
           const realLastHash = chain[i-1].hash;
          
           if(prevHash !== realLastHash) return false
           
        }
         return true
    }
}


const blockchain = new BlockChain();
blockchain.addBlock({data:"NEW BLOCK 1"});
blockchain.addBlock({data:"NEW BLOCK 2"});
blockchain.addBlock({data:"NEW BLOCK 3"});
blockchain.addBlock({data:"NEW BLOCK 4"});
// console.log(blockchain.chain);
console.log(BlockChain.isValidChain(blockchain.chain));


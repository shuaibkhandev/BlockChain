const Block = require("./block");
const cryptoHash = require("./crypto-hash");


class BlockChain{
    constructor(){
        this.chain = [Block.genesis()]
    }

    addBlock({data}){
        const newBlock = Block.miningBlock({
            prevBlock: this.chain[this.chain.length-1],
            data
        })
        this.chain.push(newBlock);
    }

    replaceChain(chain){
        if(chain <= this.chain.length){
            console.error('The incoming chain is not longer');
            return;
        }
        if(!BlockChain.isValidChain(chain)){
            console.error('The incoming chain is not valid');
            return;
        }
        this.chain = chain;
    }

    static isValidChain(chain){
        if( JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for(let i = 1; i<chain.length; i++){
            const {timestamp, data, prevHash , hash} = chain[i];
            const lastDifficulity = chain[i-1].difficulity;
            
            const realLastHash = chain[i-1].hash;
            if(realLastHash !== prevHash) return false;
    
            const validatedHash = cryptoHash(timestamp, prevHash, data);
            if(validatedHash !== hash) return false;
            if(Math.abs(lastDifficulity - difficulity) > 1) return false;

        }
        return true;
    }
}


const blockchain = new BlockChain();
blockchain.addBlock({data:"Block1"});
blockchain.addBlock({data:"Block2"});
blockchain.addBlock({data:"Block3"});
blockchain.addBlock({data:"Block4"});
blockchain.addBlock({data:"Block5"});
blockchain.addBlock({data:"Block6"});
module.exports = {blockchain};
    
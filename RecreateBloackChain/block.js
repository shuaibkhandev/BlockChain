const {GENESIS_DATA} = require("./config");

class Block{
    constructor({timestamp, prevHash, hash, data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }

    static genesis(){
      return new this(GENESIS_DATA)
      
    }
}


const block1 = new Block({timestamp:1, prevHash:"000", hash:"0ab3", data:"Hello"});
console.log(Block.genesis());



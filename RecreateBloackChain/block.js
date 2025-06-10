class Block{
    constructor({timestamp, prevHash, hash, data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }
}

const block1 = new Block({timestamp:1, prevHash:"000", hash:"0ab3", data:"Hello"});
const block2 = new Block({timestamp:2, prevHash:"0ab3", hash:"0f12", data:"World"});
console.log(block2);

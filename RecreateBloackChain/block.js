class Block{
    constructor(timestamp, prevHash, hash, data){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }
}


const block1 = new Block(1, "000", "0ab3", "Hello");
console.log(block1);

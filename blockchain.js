const Block = require("./block");

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
}

const chain = new Blockchain();
chain.addBlock({ data: "first block" });

chain.addBlock({ data: "second block" });

console.log(chain);

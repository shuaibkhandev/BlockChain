const BlockChain = require("./blockchain");
const blockchain = new BlockChain();

blockchain.addBlock({data:"Block 1"})

let prevTimestamp, nextTimestamp, nextBlock, timeDiff,  avgTime;

let times = [];

for(let i=0; i<=10; i++ ){
    prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;
    blockchain.addBlock({data: `Block ${i+2}`});
    nextBlock = blockchain.chain[blockchain.chain.length-1];
    nextTimestamp = nextBlock.timestamp;
    timeDiff = nextTimestamp - prevTimestamp;
    times.push(timeDiff)

    avgTime = times.reduce((acc, next)=>{
      return acc + next
    },0)/times.length

    console.log(`Time to Mine Block: ${timeDiff}ms, Difficulity ${nextBlock.difficulity}, Average Time ${avgTime}`);
    
}

console.log(avgTime);





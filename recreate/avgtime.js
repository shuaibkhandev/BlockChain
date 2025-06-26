const Blockchain = require("./blockchain");
const blockchain = new Blockchain;

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, averageTime;

const times = [];

blockchain.addBlock({data:"New Block"})
for(let i=0; i<=1000; i++){
    prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;
    blockchain.addBlock({data:`Block ${i}`})
    nextBlock = blockchain.chain[blockchain.chain.length-1];
    nextTimestamp = nextBlock.timestamp;
    timeDiff = nextTimestamp - prevTimestamp;
    
    times.push(timeDiff)
    
    averageTime = times.reduce((total, num)=> total+num,0)/times.length;
    console.log(`Time to Mine Block: ${timeDiff}ms, Difficulity ${nextBlock.difficulity}, Average Time ${averageTime}ms`);
}


const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const BlockChain = require("./blockchain");
const PubSub = require("./pubSub");

const blockchain = new BlockChain();
const pubsub = new PubSub({blockchain})

app.use(bodyParser.json());

setTimeout(()=>{
    pubsub.broadcastChain()
},1000)


app.get('/api/blocks', (req, res)=>{
    res.send(blockchain);
})

app.post("/api/block", (req, res)=>{
    const {data} = req.body;    
    blockchain.addBlock({data});
       pubsub.broadcastChain()
    res.redirect('/api/blocks');
})


const DEFAULT_PORT = 8000;
let PEER_PORT;

if(process.env.GENERATE_PEER_PORT==='true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, ()=>{
    console.log(`Server start at port ${PORT}`);  
})
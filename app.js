const express = require("express");
const request = require("request");
const BlockChain = require("./blockchain");
const blockchain = new BlockChain();
const PubSub = require("./pub-sub");
const app = express();


const ROOT_NODE_ADDRESS = 'http://localhost:8000'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pubsub = new PubSub({blockchain});

setTimeout(()=>{
    pubsub.prodcastChain();
},1000)

app.get("/api/blocks", (req, res)=>{
    res.send(blockchain.chain);
})

app.post("/api/mine-block", (req, res)=> {
    const {data} = req.body;
    blockchain.addBlock({data});
    pubsub.prodcastChain();
    res.redirect("/api/blocks")
    
})

const PORT = process.env.PORT || 8000;


const syncChains = () => {
    request({url:`${ROOT_NODE_ADDRESS}/api/blocks`}, (error, response, body)=>{
        if(!error && response.statusCode === 200){
            const rootChain = JSON.parse(body);
            console.log(`Replace chain on sync with: ${ROOT_NODE_ADDRESS}`);
            blockchain.replaceChain(rootChain);       
        }
    })
}


app.listen(PORT, ()=>{
    console.log(`Server start at port no ${PORT}`);
    syncChains();
})


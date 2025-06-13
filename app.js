const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const BlockChain = require("./blockchain");
const PORT = 8000;
const blockchain = new BlockChain();



app.use(bodyParser.json());

app.get('/api/blocks', (req, res)=>{
    res.send(blockchain);
})

app.post("/api/block", (req, res)=>{
    const {data} = req.body;    
    blockchain.addBlock({data});
    res.redirect('/api/blocks');
})

app.listen(PORT, ()=>{
    console.log(`Server start at port ${PORT}`);  
})
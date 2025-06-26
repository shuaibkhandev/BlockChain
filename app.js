const express = require("express");
const BlockChain = require("./blockchain");
const blockchain = new BlockChain();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/blocks", (req, res)=>{
    res.send(blockchain.chain);
})

app.post("/api/mine-block", (req, res)=> {
    const {data} = req.body;
    blockchain.addBlock({data});
    res.redirect("/api/blocks")
    
})

const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`Server start at port no ${PORT}`);
    
})
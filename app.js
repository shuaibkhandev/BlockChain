const express = require("express");
const app = express();
const {blockchain} = require("./blockchain");
const PORT = 8000;




app.get('/api/blocks', (req, res)=>{
    res.send(blockchain);
})


app.listen(PORT, ()=>{
    console.log(`Server start at port ${PORT}`);  
})
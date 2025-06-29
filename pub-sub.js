const redis = require("redis");

const CHANNEL = {
    Test : "Test Channel",
    BlockchainChannel : "This is a Blockchain Channel!"
}

class PubSub{
    constructor({blockchain}){
        this.blockchain = blockchain;
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();
        this.subscriber.subscribe(CHANNEL.BlockchainChannel);
        this.subscriber.on("message", (channel, message)=> this.handleMessage(channel, message));
    }
    handleMessage(channel, message){
        console.log(`Message recieved. Channel: ${channel}, Message:${message}`);   
        const parseMessage = JSON.parse(message);
         
        if(channel === CHANNEL.BlockchainChannel){
               console.log(`🔁 Attempting to replace chain on PORT: ${process.env.PORT}`);
        
            this.blockchain.replaceChain(parseMessage);
        }    
    }

    publish({channel, message}){
        this.publisher.publish(channel, message)
    }

    prodcastChain(){
        this.publish({
            channel : CHANNEL.BlockchainChannel,
            message : JSON.stringify(this.blockchain.chain)
        })
    }
}

// const checkPubSub = new PubSub;

// setTimeout(()=>{
//     checkPubSub.publisher.publish(CHANNEL.Test, "HELLO WORLD");
// },1000)


module.exports = PubSub;
const redis = require('redis');

const channels = {
    test : "Test Channel"
}

class PubSub{
    constructor(){
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();
        this.subscriber.subscribe(channels.test);
        this.subscriber.on("message", (channel, message)=>this.handleMessage(channel, message))
    }

    handleMessage(channel, message){
        console.log(`Message recieved. Channel => ${channel}, Message => ${message}`);
    }
}

const checkPubSub = new PubSub();
setTimeout(()=>{
    checkPubSub.publisher.publish(channels.test, 'HELLO FROM DISTRIBUTED BLOCK');
}, 1000)

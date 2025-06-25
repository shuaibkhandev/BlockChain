const crypto = require("crypto");


const CryptoHash = (...inputes) => {
    
    const hash = crypto.createHash("sha256");
    hash.update(inputes.sort().join(""));
    return hash.digest("hex");
    
    
}
module.exports = CryptoHash;

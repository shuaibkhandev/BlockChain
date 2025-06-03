const crypto = require("crypto");
console.log();

const cryptoHash = (...inputes) => {
const hash = crypto.createHash("sha256");
 hash.update(inputes.sort().join(""));
 return hash.digest("hex");
}


module.exports = cryptoHash;

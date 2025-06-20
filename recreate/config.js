const MINIE_RATE = 1000;
const INITIAL_DIFFICULITY = 2;
const GENESIS_DATA = {
    timestamp : Date.now(),
    prevHash : '',
    hash : "0000000000000000000000000000000000000000000000000000000000000000",
    difficulity: INITIAL_DIFFICULITY,
    nonce:0,
    data : []
}


module.exports = {GENESIS_DATA, MINIE_RATE}
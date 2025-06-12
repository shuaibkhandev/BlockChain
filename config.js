const MINE_RATE = 1000; /* 1000MILISEC = 1SEC */
const INITIAL_DIFFICULITY = 3;
const GENESIS_DATA = {
    timestamp : 1,
    prevHash : '',
    hash : "0000000000000000000000000000000000000000000000000000000000000000",
    nonce:0,
    difficulity : INITIAL_DIFFICULITY,
    data : []
}


module.exports = {GENESIS_DATA, MINE_RATE} 
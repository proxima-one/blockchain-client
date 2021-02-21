//clients are the only thing that change
'use strict'
const Web3Client = require('./Web3Client.js')

class BinanceClient extends Web3Client {
  constructor(network, clients, startBlock = 0, args = {}) {
    super('binance', network, clients, startBlock, args);
  }
}


module.exports = BinanceClient

//clients are the only thing that change
'use strict'
const Web3Client = require('./Web3Client.js')

class AlgorandClient extends Web3Client {
  constructor(network, clients, startBlock = 0, args = {}) {
    super('algorand', network, clients, startBlock, args);
  }
}


module.exports = AlgorandClient

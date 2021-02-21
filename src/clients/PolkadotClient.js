//clients are the only thing that change
'use strict'
const Web3Client = require('./Web3Client.js')

class PolkadotClient extends Web3Client {
  constructor(network, clients, startBlock = 0, args = {}) {
    super('polkadot', network, clients, startBlock, args);
  }
}


module.exports = PolkadotClient

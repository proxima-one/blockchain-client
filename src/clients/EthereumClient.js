//this is in charge of the correct client for now it is a placeholder
'use strict';
const Web3Client = require('./Web3Client.js');


class EthereumClient extends Web3Client {

  constructor(network, clients, startBlock = 0, args = {}) {
    super("ethereum", network, clients, startBlock, args);
  }
}

module.exports = EthereumClient;

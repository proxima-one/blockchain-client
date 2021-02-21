
'use strict'

const Web3 = require('web3');


class BlockchainClientTemplate {

  constructor(name, networks = {}, blockchainClientClass) {
    this.name = name;
    this.networks = networks;
    this.blockchainClientClass = blockchainClientClass;

  }

  get(name, network, startBlock) {
    let client = new this.blockchainClientClass(name, networks[network], startBlock)
    return client
  }
}

class abstract BlockchainClient {

  constructor(name, network, startBlock, uris = {}, args = {}) {
    this.name = name;
    this.network = network;
    this.urls = urls;
    this.startBlock = startBlock;

    this.listeners = {}
    this.handlers = {}

    this.contractCode;
    this.contractAddress;
    this.abi;
    this.contracts;
    this.client;
    this.updateClient();
  }

  updateClient() {}

  newClientConfig() {
    let randomIndex = math.random(this.clients.length)
    return clients[randomIndex]
  }

  addHandlers(contractAddress, abi, handlers, startBlock = this.startBlock, contracts = {}) {
    this.abi = abi;
    this.contractAddress = contractAddress
    this.handlers = handlers
    this.startBlock = startBlock
    this.contracts = contracts
}

  stop() {
    for (const listenerName in this.listeners.keys()) {
      this.stop(listenerName)
    }
  }

  stop(listenerName) {
    this.listeners[listenerName] = null
  }

  subscribe() {
    for (const listenerName in this.listeners.keys()) {
      this.subscribe(listenerName)
    }
  }

  sync() {
    for (const listenerName in this.listeners.keys()) {
      await this.sync(listenerName)
    }
  }

  async sync(listenerName) {
    let syncFns = { 'event': this.syncEvents,
    'block': this.syncBlocks,
    'transactions' : this.syncTransactions,
    'function': this.syncFunctions
    }
    return await syncFns[listenerName]()
  }

  syncEvents() {}
  syncBlocks() {}
  syncFunctions(){}
  syncTransactions(){}

  async start() {
    await this.sync();
    this.subscribe();
  }

  async start(listenerName) {
    await this.sync(listenerName)
    this.subscribe(listenerName)
  }


  subscribe(listenerName) {
    let subFns = { 'event': this.subscribeEvents,
    'block': this.subscribeBlocks,
    'transactions' : this.subscribeTransactions,
    'function': this.subscribeFunctions
    }
    return await subFns[listenerName]()
  }

  subscribeEvents() {}
  subscribeBlocks() {}
  subscribeFunctions(){}
  subscribeTransactions(){}

}

module.exports = {BlockchainClient, BlockchainClientTemplate}

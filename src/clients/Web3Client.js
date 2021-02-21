//this is in charge of the correct client for now it is a placeholder
'use strict';
const Web3 = require('web3');
const BlockchainClient = require('./BlockchainClient.js')

class Web3Client extends BlockchainClient {

  constructor(name, network, clients, startBlock = 0, args = {}) {
    super(name, network, clients, startBlock, args);
  }

initStatus() {
  this.status.currentBlock = 0
  for (const name of this.handlers.keys()) {
    this.status[name] =  {syncedBlock: 0, isSubscribed: false}
  }
}

updateStatus(name, syncedBlock, currentBlock = 0) {
  this.status[name].synedBlock = syncedBlock
  if (currentBlock > this.status.currentBlock) {
    this.status.currentBlock = currentBlock
  }
  if (syncedBlock > this.status.currentBlock + 500) {
    this.status[name].isSubscribed = true
  }
}

  updateClient() {
    if (!this.client) {
      const provider = new Web3.providers.HttpProvider(this.newClientConfig());
      this.client = new Web3(provider);
    }
  }

  addHandlers(contractAddress, abi, handlers, startBlock = this.startBlock, contracts = {}) {
    super(contractAddress, abi, handlers, startBlock, contracts)
    this.initStatus()
    this.contract = this.client.eth.Contract(this.contractAddress, this.contractCode);
  }

  sync(type) {
    while (!this.status[type].isSubscribed) {
      this.syncFn(type)
    }
  }

  subscribe(type) {
    this.subscribeFn(type)
  }

  subscribeFn(type) {
    let synchronizedBlock, currentBlock = 0, 0;
    switch (type) {
      case 'events':
        //get events, with handler function
        //synchronizedBlock
        let synchronizedBlock, currentBlock = this.subscribeEvents();
        break;
      case 'transactions':
        this.syncTransactions();
        let synchronizedBlock, currentBlock = this.subscribeTransactions();
        break;
      case 'functions':
        this.syncFunctions();
        let synchronizedBlock, currentBlock = this.subscribeFunctions();
        break;
      case 'block':
        this.syncBlocks();
        let synchronizedBlock, currentBlock = this.subscribeBlocks();
        break;
    }
    this.updateStatus(type, synchronizedBlock, currentBlock);
  }

  syncFn(type) {
    let synchronizedBlock, currentBlock = 0, 0;
    switch (type) {
      case 'events':
        //get events, with handler function
        //synchronizedBlock
        let synchronizedBlock, currentBlock = this.syncEvents();
        break;
      case 'transactions':
        this.syncTransactions();
        let synchronizedBlock, currentBlock = this.syncTransactions();
        break;
      case 'functions':
        this.syncFunctions();
        let synchronizedBlock, currentBlock = this.syncFunctions();
        break;
      case 'block':
        this.syncBlocks();
        let synchronizedBlock, currentBlock = this.syncBlock();
        break;
    }
    this.updateStatus(type, synchronizedBlock, currentBlock);
  }

  syncEvents() {
    let nextBlock = this.synchronizedBlock + 1000
      this.contract.getPastEvents('allEvents',{fromBlock: this.synchronizedBlock, toBlock: nextBlock -1},
          async function(error, events) {
            if (events) {
              for (var i = 0; i < events.length; i++) {
                let contractEvent = events[i]
                await this.handlers.events(contractEvent);
              }
            } else {
              console.log(error, nextBlock);
            }
      });
    return nextBlock, this.status.currentBlock
  }

  syncBlocks() {
    return true
  }

  syncFunctions() {
    return true
  }

  syncTransactions() {
    return true
  }

  // blockHandler(result) {
  //   let isCorrect = this.ethereumBlockHandler(result);
  //   let blockNumber = result.number;
  //   if (isCorrect && blockNumber && blockNumber > this.currentBlock) {
  //     this.currentBlock = blockNumber;
  //     this.mappings.blockHandler();
  //   }
  // }

  //blockHandler is equivalent to all of them

  subscribeEvents() {
    this.listeners.events = this.contract.events.allEvents({fromBlock: this.synchronizedBlock}, async function(error, event) {
      await this.handlers.events(event);
      //update status
    });
  }

  subscribeBlocks() {
    this.listeners.blocks = this.client.eth.subscribe('newBlockHeaders',
      async function(error, result) {
        await this.handlers.blocks(result);
        //update status this.blockHandler(result);
      }
    );
  }

  subscribeTransactions() {
    return true;
  }

  subscribeFunctions() {
    return true;
  }



}

module.exports = Web3Client;

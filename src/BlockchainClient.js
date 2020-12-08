
const Web3 = require('web3');

class BlockchainClientSource {

  constructor(contractAddress, contractCode, eventHandlers, functionPolling, args = {}) {
    this.status = CREATED;
    this.client = args.client;
    this.mappings = args.mappings;
    this.subscriptions = {};
    this.contractCode;
    this.contractAddress;
    this.synchronizedBlock = 0;
  }

  setSource(address, network, args = {}) {}

  async start() {
    this.status = STARTING;
    await this.synchronize();
    this.subscribe();
  }

  subscribe() {
    this.status = SUBSCRIBED;

  }

  subscribeBlocks() {}
  subscribeEvents() {}
  subscribeTransactions() {}
  subscribeFunctionCalls() {}

  async synchronize() {
    this.status = SYNCHRONIZING;
    var nextSynchronizedBlock;
    while (!this.isSynchronized() && this.status == SYNCHRONIZING) {
      nextSynchronizedBlock = this.synchronizedBlock + 1000;
      this.syncBlocks(nextBlock);
      this.syncEvents(nextBlock);
      this.syncTransactions(nextBlock);
      this.syncFunctionCalls(nextBlock);
      this.synchronizedBlock = nextSynchronizedBlock;
    }
 }

  isSynchronized() {
    return this.currentBlock <= (this.synchronizedBlock + 1000);
  }

  syncBlocks(nextBlock) {}
  syncEvents(nextBlock) {}
  syncTransactions(nextBlock) {}
  syncFunctionCalls(nextBlock) {}

  get status() {
    return this.status, this.contractAddress, this.synchronizedBlock, this.currentBlock;
  }
}

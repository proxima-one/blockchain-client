//this is in charge of the correct client for now it is a placeholder

const Web3 = require('web3');

class BlockchainClient {

  constructor(contractAddress, contractCode, eventHandlers, functionPolling, args = {}) {
    super(args);

    this.status = CREATED;
    this.client = args.client;
    this.mappings;
    this.subscriptions;
    this.functionPollingSubscription;
    this.blockchainSubscription;
    this.synchronizedBlock = 0;

    //
  }

  async start() {
    if (this.status == UNSUBSCRIBED || this.status == STOPPED) {
      this.status = STARTING;
      this.synchronize(this.mappings);
      this.subscribeToBlocks();
      await this.synchronize();
      this.subscribe();
    }
  }

  setSource() {
    if (!this.client) {
      const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io:443');
      this.client = new Web3(provider);
    }
    this.contract = this.client.eth.Contract(contractAddress, contractCode);
  }

  syncEvents(nextBlock) {
    this.contract.getPastEvents('allEvents',{fromBlock: this.synchronizedBlock, toBlock: nextBlock - 1},
        async function(error, events){
          if (events) {
            for (var i = 0; i < events.length; i++) {
              let contractEvent = events[i]
              await this.mappings.eventHandlers(contractEvent);
            }
          } else {
            console.log(error);
          }
    });
  }

  syncBlocks(nextBlock) {
    return;
  }
  syncTransactions(nextBlock) {
    return;
  }
  syncFunctionCalls(nextBlock) {
    return;
  }

  subscribeEvents() {
    this.subscriptions.eventHandlers = this.contract.events.allEvents({fromBlock: this.synchronizedBlock}, async function(error, event) {
      await this.mappings.eventHandlers(event);
    });
  }

  subscribeBlocks() {
    this.subscriptions.blockHandlers = this.client.eth.subscribe('newBlockHeaders',
      async function(error, result) {
        await this.ethereumBlockHandler(result);
        this.blockHandler(result);
      }
    );
  }

///TODO
  subscribeTransactions() {
    return;
  }
//TODO
  subscribeFunctionCalls() {
    return;
  }

  blockHandler(result) {
    let isCorrect = this.ethereumBlockHandler(result);
    let blockNumber = result.number;
    if (isCorrect && blockNumber && blockNumber > this.currentBlock) {
      this.currentBlock = blockNumber;
      this.mappings.blockHandler();
    }
  }
//TODO
  ethereumBlockHandler(result) {
    return true;
  }


}


var assert = require("assert");




//get/check clients

//check client is valid

//check client events, transactions, blocks, are in the correct format for blocks
function validClientTest(name, client) {
  //describe check urls
  //check structure
  //connections
  //init


  
  //blockHandlers
    //sync, subscribe
    //valid blocks etc
  //smart contract Listener
    //init
    //sync
    //subscribe
    //valid events, functions, etc
}




//for every blockchain client, perform the same tests
//eventually will need the audits, vertification, etc

describe('blockchain client main', function() {
  describe('blockchain client main', function() {
  //
  it('should be able to init using url(s)/providers and args', function() {
    let args = {}
    const blockchainClient = new BlockchainClient(args)
    //add providers
    assert.equal(true, false);
  });
  //
  it('should be able to create smart contract listener', function() {
    smartContractListener = blockchainClient.smartContractListener();
    eventListener = blockchainClient.eventListener(args={});
    //handlers
    functionListener = blockchainClient.eventListener(args={});
    //functions
    transactionListener = blockchainClient.transactionListener(args={});
    //transactions
    assert.equal(true, false);
  });
  //
  it('should be able to create block handler', function() {
    blockListener = blockchainClient.blockListener();
    //blocks
    assert.equal(true, false);
  });
  //
  it('should be able to create transaction handler', function() {
    transactionListener = blockchainClient.transactionListener(args={});
    //transactions
    assert.equal(true, false);
  });
  //
  it('should be able to create event handler', function() {
    eventListener = blockchainClient.eventListener(args={});
    //eventListener.start()
    assert.equal(true, false);
  });


  describe('blockchain client listeners', function() {
  //
  it('should be able to create using args', function() {
    let args = {}
    const blockchainClient = new BlockchainClient(args)
    //add providers
    assert.equal(true, false);
  });
});
  });
});

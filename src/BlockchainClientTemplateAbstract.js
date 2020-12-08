

class abstract BlockchainClientTemplate {

  constructor(name, abiCode, eventHandlers, functionPolls, args = {}) {
    this.name = name;
    this.abiCode = abiCode;
    this.abis = abis;
    this.eventHandlers = eventHandlers;
    this.functionPolls = functionPolls;
    this.smartContractListeners = {};
  }

  create(contractAddress, client) {
    var contractListener = new SmartContractListener(contractAddress, this.abiCode, this.eventHandlers, this.functionPolls, {client: client});
    this.smartContractListeners[contractAddress] = contractListener;
  }

  remove(contractAddress) {
    var contractListener;
    contractlistener.stop();
    this.smartContractListeners[contractAddress] = null;
  }

  start(contractAddress) {
    let contractListener = this.smartContractListeners[contractAddress]
    if (contractlistener) {
      contractListener.start();
    }
  }

  startAll() {
    var contractListener;
    for (var contractAddress in this.smartContracts) {
      contractListener = this.smartContracts[contractAddress];
      contractListener.start();
    }
  }

  stop(contractAddress) {
    let contractListener = this.smartContractListeners[contractAddress]
    if (contractlistener) {
      contractListener.stop();
    }
  }

  stopAll() {
    var contractListener;
    for (var contractAddress in this.smartContracts) {
      contractListener = this.smartContracts[contractAddress];
      contractListener.stop();
    }
  }


}

'use strict'
const Clients = require('./clients/index.js')

function init(config, mainClients = Clients) {
  let clients = getClients(config, Clients)
  let blockchainClientMain = new BlockchainClientMain()
  blockchainClientMain.addClients(clients)
  return blockchainClientMain
}

function getClientConfig(config) {
  let datasources = config.datasource
  let clients = []
  for (const datasource of datasources) {
    clients.append(datasource.client)
  }
  return clients
}

function getClients(config, mainClients = {}) {
  let clients = mainClients
  let clientsConfig = getClientConfig(config)
  for (const clientConfig of clientsConfig) {
    if (clientConfig.file) {
      let client = require(clientConfig.file)
    } else {
      let client = clients[clientConfig.name]
    }
    clients.append(client)
  }
  return clients
}

class BlockchainClientMain {
  constructor() {
    this.clientTemplates = {}
  }

  addClients(clients) {
    for (const client of clients) {
      this.clientTemplates[client.name] = client
    }
  }

  importClients(clientPaths) {
    for (const clientPath of clientPaths) {
      let client = require(clientPath)
      this.clientTemplates[client.name] = client
    }
  }

  get(name, network, startBlock = 10634502, args = {}) {
    return this.clientTemplates[name].get(name, network, startBlock, args = {})
  }

}


module.exports = {init, BlockchainClientMain}

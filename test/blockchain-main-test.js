//list of blockchain clients
const blockchainClients = require("../index.js");


for (client in blockchainClients) {
  blockchainClientTest(client)
}

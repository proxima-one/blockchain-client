function getProvider() {}
function setProvider() {}
function fetchProvider(args = {}) {}
function newProvider() {
  let provider = await this.getProvider();
  this.setProvider(provider);
}

const tdr = require('truffle-deploy-registry')
const TokenMock = artifacts.require('TokenMock.sol')

module.exports = function(deployer, networkName, accounts) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {
    const token = await TokenMock.deployed()

    let i;
    for (i = 0; i < Math.min(accounts.length, 10); i++) {
      await token.mint(accounts[i], web3.utils.toWei('10000', 'ether'))
    }
  })
};

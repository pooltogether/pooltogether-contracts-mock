const tdr = require('truffle-deploy-registry')
const TokenMock = artifacts.require('TokenMock.sol')
const MoneyMarket = artifacts.require('MoneyMarket.sol')

module.exports = function(deployer, networkName, accounts) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {
    const token = await TokenMock.deployed()
    const moneyMarket = await MoneyMarket.deployed()
    await token.mint(moneyMarket.address, web3.utils.toWei('10000000', 'ether'))
  })
};

// 1_initial_migration.js
const shell = require('shelljs')
const tdr = require('truffle-deploy-registry')
const TokenMock = artifacts.require('TokenMock.sol')
const MoneyMarket = artifacts.require('MoneyMarket.sol')

module.exports = function(deployer, networkName, accounts) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {
    const feeFraction = web3.utils.toWei('0.05', 'ether')

    const moneyMarket = await MoneyMarket.deployed()

    if (shell.exec(`openzeppelin create RealPool --init init --args ${accounts[0]},${moneyMarket.address},${feeFraction},${accounts[0]} --network ${networkName} --from ${process.env.ADMIN_ADDRESS}`).code !== 0) {
      throw new Error('Migration failed')
    }
  })
};

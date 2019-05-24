// 1_initial_migration.js
const shell = require('shelljs')
const tdr = require('truffle-deploy-registry')
const TokenMock = artifacts.require('TokenMock.sol')
const MoneyMarket = artifacts.require('MoneyMarket.sol')

module.exports = function(deployer, networkName, accounts) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {
    const blocksPerMinute = 5
    const min = 60
    const openDuration = 1 * min * blocksPerMinute
    const lockDuration = 5 * min * blocksPerMinute

    const ticketPrice = web3.utils.toWei('20', 'ether')
    const feeFraction = web3.utils.toWei('0.05', 'ether')

    const token = await TokenMock.deployed()
    const moneyMarket = await MoneyMarket.deployed()
    if (shell.exec(`zos create RealPoolManager --init init --args ${accounts[0]},${moneyMarket.address},${token.address},${openDuration},${lockDuration},${ticketPrice},${feeFraction},true --network ${networkName} --from ${process.env.ADMIN_ADDRESS}`).code !== 0) {
      throw new Error('Migration failed')
    }
  })
};

// 1_initial_migration.js
const shell = require('shelljs')
const tdr = require('truffle-deploy-registry')
const TokenMock = artifacts.require('TokenMock.sol')
const MoneyMarket = artifacts.require('MoneyMarket.sol')

module.exports = function(deployer, networkName, accounts) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {
    const min = 60
    const openDuration = 1 * min
    const bondDuration = 5 * min

    const token = await TokenMock.deployed()
    const moneyMarket = await MoneyMarket.deployed()
    if (shell.exec(`zos create RealLotteryManager --init init --args ${accounts[0]},${moneyMarket.address},${token.address},${openDuration},${bondDuration} --network ${networkName} --from ${process.env.ADMIN_ADDRESS}`).code !== 0) {
      throw new Error('Migration failed')
    }
  })
};

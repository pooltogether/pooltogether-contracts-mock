// 1_initial_migration.js
const shell = require('shelljs')
const tdr = require('truffle-deploy-registry')
const TokenMock = artifacts.require('TokenMock.sol')

module.exports = function(deployer, networkName, accounts) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {

    let supplyRateMantissa = '4960317460300' // about 20% per week

    const token = await TokenMock.deployed()
    if (shell.exec(`openzeppelin create MoneyMarket --init initialize --args ${token.address},${supplyRateMantissa} --network ${networkName} --from ${process.env.ADMIN_ADDRESS}`).code !== 0) {
      throw new Error('Migration failed')
    }
  })
};

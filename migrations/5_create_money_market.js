// 1_initial_migration.js
const shell = require('shelljs')
const tdr = require('truffle-deploy-registry')
const TokenMock = artifacts.require('TokenMock.sol')

module.exports = function(deployer, networkName, accounts) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {

    let supplyRateMantissa = '1000000000000000' // 0.001 per block

    const token = await TokenMock.deployed()
    if (shell.exec(`zos create MoneyMarket --init initialize --args ${token.address},${supplyRateMantissa} --network ${networkName} --from ${process.env.ADMIN_ADDRESS}`).code !== 0) {
      throw new Error('Migration failed')
    }
  })
};

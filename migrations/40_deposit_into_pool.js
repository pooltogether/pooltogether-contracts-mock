const tdr = require('truffle-deploy-registry')
const RealPoolManager = artifacts.require('RealPoolManager.sol')
const TokenMock = artifacts.require('TokenMock.sol')
const RealPool = artifacts.require('RealPool.sol')

module.exports = function(deployer, networkName, accounts) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {
    const poolManager = await RealPoolManager.deployed()
    const poolAddress = await poolManager.currentPool()
    const pool = await RealPool.at(poolAddress)
    const token = await TokenMock.deployed()

    const ticketPrice = web3.utils.toWei('20', 'ether')
    await token.approve(poolAddress, ticketPrice)
    await pool.buyTickets(1)
  })
};

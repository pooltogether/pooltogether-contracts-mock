const tdr = require('truffle-deploy-registry')
const TokenMock = artifacts.require('TokenMock.sol')
const RealPool = artifacts.require('RealPool.sol')

module.exports = function(deployer, networkName, accounts) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {
    const pool = await RealPool.deployed()
    const token = await TokenMock.deployed()

    const ticketPrice = web3.utils.toWei('20', 'ether')
    await token.approve(pool.address, ticketPrice)
    await pool.depositPool(ticketPrice)
  })
};

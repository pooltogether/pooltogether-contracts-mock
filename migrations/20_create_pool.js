const tdr = require('truffle-deploy-registry')
const RealPoolManager = artifacts.require('RealPoolManager.sol')

module.exports = function(deployer, networkName) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {
    const poolManager = await RealPoolManager.deployed()
    await poolManager.createPool()
  })
};

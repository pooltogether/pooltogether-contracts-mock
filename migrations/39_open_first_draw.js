const tdr = require('truffle-deploy-registry')
const RealPool = artifacts.require('RealPool.sol')

module.exports = function(deployer, networkName, accounts) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {
    const pool = await RealPool.deployed()

    const secret = web3.utils.soliditySha3(process.env.SECRET_SEED, 1)
    const secretHash = web3.utils.soliditySha3(secret)

    await pool.openNextDraw(secretHash)
  })
};

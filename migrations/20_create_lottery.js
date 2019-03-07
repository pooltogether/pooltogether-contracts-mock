const tdr = require('truffle-deploy-registry')
const RealLotteryManager = artifacts.require('RealLotteryManager.sol')

module.exports = function(deployer, networkName, accounts) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {
    const lotteryManager = await RealLotteryManager.deployed()
    await lotteryManager.createLottery()
  })
};

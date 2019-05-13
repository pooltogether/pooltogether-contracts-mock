const tdr = require('truffle-deploy-registry')
const RealLotteryManager = artifacts.require('RealLotteryManager.sol')
const TokenMock = artifacts.require('TokenMock.sol')
const RealLottery = artifacts.require('RealLottery.sol')

module.exports = function(deployer, networkName, accounts) {
  if (tdr.isDryRunNetworkName(networkName)) { return }
  deployer.then(async () => {
    const lotteryManager = await RealLotteryManager.deployed()
    const lotteryAddress = await lotteryManager.currentLottery()
    const lottery = await RealLottery.at(lotteryAddress)
    const token = await TokenMock.deployed()

    const ticketPrice = web3.utils.toWei('20', 'ether')
    await token.approve(lotteryAddress, ticketPrice)
    await lottery.buyTickets(1)
  })
};

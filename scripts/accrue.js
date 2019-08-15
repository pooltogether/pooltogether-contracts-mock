

async function accrue() {
  const MoneyMarket = artifacts.require('MoneyMarket.sol')
  const RealPool = artifacts.require('RealPool.sol')

  mm = await MoneyMarket.deployed()
  p = await RealPool.deployed()
  console.log(`MoneyMarket(${mm.address})#reward(${p.address})`)
  await mm.reward(p.address)
  console.log(`Complete`)
}

module.exports = function (done) {
  accrue().then(done)
}
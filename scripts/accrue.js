#!/usr/bin/env node
const assert = require('assert')
const chalk = require('chalk')
const { buildContext } = require('oz-console')

let consoleNetwork, networkConfig

const commander = require('commander');
const program = new commander.Command()
program.option('-r --rinkeby', 'run accrue against rinkeby', () => true)
program.parse(process.argv)

if (program.rinkeby) {
  console.log(chalk.green(`Using network rinkeby`))
  // The network that the oz-console app should talk to.  (should really just use the ozNetworkName)
  consoleNetwork = 'rinkeby'

  // The OpenZeppelin SDK network config that oz-console should use as reference
  networkConfig = '.openzeppelin/rinkeby.json'
} else {
  console.log(chalk.green(`Using network local`))
  // The network that the oz-console app should talk to.  (should really just use the ozNetworkName)
  consoleNetwork = 'http://localhost:8545'

  // The OpenZeppelin SDK network config that oz-console should use as reference
  networkConfig = '.openzeppelin/dev-1234.json'
}

async function accrue() {
  const context = buildContext({
    projectConfig: '.openzeppelin/project.json',
    consoleNetwork,
    networkConfig,
    directory: 'build/contracts',
    verbose: false,
    mnemonic: process.env.HDWALLET_MNEMONIC
  })
  
  let tx, receipt

  console.log(chalk.yellow('Awarding cDai...'))
  tx = await context.contracts.cDai.reward(context.contracts.PoolDai.address)
  await context.provider.waitForTransaction(tx.hash)
  receipt = await context.provider.getTransactionReceipt(tx.hash)
  assert.equal(receipt.status, '1')
  console.log(chalk.green('Awarded cDai!'))

  console.log(chalk.yellow('Awarding cSai...'))
  tx = await context.contracts.cSai.reward(context.contracts.PoolSai.address)
  await context.provider.waitForTransaction(tx.hash)
  receipt = await context.provider.getTransactionReceipt(tx.hash)
  assert.equal(receipt.status, '1')
  console.log(chalk.green('Awarded cSai!'))
}

console.log(chalk.yellow('Starting accrue...'))
accrue().then(() => {
  console.log(chalk.green('Done accrual!'))
})
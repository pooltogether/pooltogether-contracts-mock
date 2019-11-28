const shell = require('shelljs')
const chalk = require('chalk')

module.exports = function (cmd) {
  console.log(chalk.dim(`$ ${cmd}`))
  const result = shell.exec(cmd)
  if (result.code !== 0) {
    throw new Error(`Could not run ${cmd}:`, result)
  }
}
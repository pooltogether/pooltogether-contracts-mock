const shell = require('shelljs')

module.exports = function (cmd) {
  console.log(`Running command ${cmd}`)
  const result = shell.exec(cmd)
  if (result.code !== 0) {
    throw new Error(`Could not run ${cmd}:`, result)
  }
}
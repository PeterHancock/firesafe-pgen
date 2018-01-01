const readline = require('readline')
const pgen = require('./pgen')
const accounts = require('./accounts.json')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.error('secret?')
rl.prompt()

rl.on('line', (line) => {
  Object.keys(accounts).forEach((accountKey) => {
    const account = accounts[accountKey]
    console.log(`
    Resource ${account.resource}
    Account ID ${account.id}
    Password ${pgen(`${account.resource}${account.key}`, line.trim())}
  `)})
  process.exit(0)
})

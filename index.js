const fs = require('fs')
const readline = require('readline')
const pgen = require('./pgen')
const accountsRaw = require('./accounts.json')
const readSecret = require('./read-secret')
const compareStringProperty = require('./compare-string-property')

const args = process.argv.slice(2)

const argsSet = new Set(args)

if (argsSet.has('--help') || argsSet.has('-h')) {
  console.log('firesafe-pgen [filter:rgx] [--help|-h] [--list|-l] [--output|-o]')
  exit()
}

const [filterMaybe = ''] = args

const filter = filterMaybe.startsWith('-') ? '.*' : filterMaybe

console.error(`Filtering accounts to resources matching ${filter}`)

const accounts = Object.keys(accountsRaw)
  .map(accountKey => accountsRaw[accountKey])
  .filter(account => account.resource.match(filter))
  .sort(compareStringProperty(account => account.resource))

if (argsSet.has('--list') || argsSet.has('-l')) {
  accounts.forEach(account => {
    console.log(`
Resource ${account.resource}
Account ID ${account.id}`)
  })
  exit()
}

readSecret('secret?', line => {
  const output = accounts
    .filter(account => account.resource.match(filter))
    .map(
      account => `
Resource ${account.resource}
Account ID ${account.id}
Password ${pgen(`${account.resource}${account.key}`, line.trim())}
  `
    )
    .join('\n')

  if (argsSet.has('--output') || argsSet.has('-o')) {
    fs.writeFileSync('./accounts.output', output)
  } else {
    console.log(output)
  }
  exit()
})

function exit() {
  process.exit(0)
}

const chalk = require('chalk')

const [, , command, name = ''] = process.argv.map(e => e.toUpperCase())

if (command === 'ADD') {
  console.log(chalk.green.inverse(`adding new task -> ${name}`))
} else if (command === 'REMOVE') {
  console.log(chalk.blue.inverse('removing a task'))
} else {
  console.log(chalk.red.inverse('command not found'))
}

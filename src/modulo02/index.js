const pkg = require('./package.json')
const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')

/** @type {string[]} */
let list
try {
  list = JSON.parse(fs.readFileSync('list.json'))
} catch {
  list = []
}

yargs.version(pkg.version)

yargs.command({
  command: 'add <task>',
  describe: 'Add a new task into the to-do list',
  handler ({ task }) {
    if (!/\w/.test(task)) {
      console.log(chalk.red('Task can not be empty'))
      return
    }
    console.log(chalk.green('Creating a new task'))
    list.push(task.toString())
  }
})

yargs.command({
  command: 'remove <index>',
  describe: 'Remove a task from the to-do list',
  handler ({ index }) {
    if (!list[index]) {
      console.log(chalk.red(`There is no task for index #${index}`))
      return
    }

    console.log(chalk.green(`Removing the #${index} task`))
    const [task] = list.splice(index, 1)
    console.log(`${JSON.stringify(task)} removed`)
  }
})

yargs.command({
  command: 'list',
  describe: 'List all tasks of the to-do list',
  handler () {
    console.log(chalk.green('All tasks:'))
    for (const index in list) {
      console.log(chalk.yellow(`${index}:`), JSON.stringify(list[index]))
    }
  }
})

yargs.command({
  command: 'read <index>',
  describe: 'Read a task from the to-do list',
  handler ({ index }) {
    const task = list[index]

    if (!task) {
      console.log(chalk.red(`There is no task for index #${index}`))
      return
    }

    console.log(chalk.yellow(`${index}:`), JSON.stringify(task))
  }
})

// eslint-disable-next-line no-unused-expressions
yargs.argv

fs.writeFileSync('list.json', JSON.stringify(list))

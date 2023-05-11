const { Command } = require('commander')

const commander = new Command()

commander
    .option('--mode <mode>', 'Modo de ejecución de app', 'production') //production development
    .parse()

module.exports = {
    commander
}

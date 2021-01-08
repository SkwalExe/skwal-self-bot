async function main() {
          const bot = require('./src/bot')
          bot.print('Launching skwal-self-bot')
          const Discord = require('discord.js-selfbot');
          const { text, checkboxes } = require('input')
          const fs = require('fs')


          async function ask() {

                    if (fs.existsSync('./config.json')) {
                              var information = require('./config.json')
                              var config = new Map();
                              config.set('token', information.token)
                              config.set('prefix', information.prefix)
                              return config
                    }


                    var config = new Map();

                    var newToken = await text('Token : ', { default: null });
                    var newPrefix = await text('Prefix : ', { default: null });

                    config.set('token', newToken.replace(/"/g, ""))
                    config.set('prefix', newPrefix)

                    var info = {}

                    info.token = config.get('token')
                    info.prefix = config.get('prefix')
                    var save = await text('Save token and prefix information (yes/no) : ', { default: null })
                    if (save == 'yes') {
                              fs.writeFileSync('./config.json', JSON.stringify(info))
                              bot.print('Configuration saved')
                    }
                    return config

          }


          var config = await ask()

          bot.print('Creating client....')
          const client = new Discord.Client();
          bot.print('Loging in....')
          client.login(config.get('token')).then(() => bot.print('Self-bot ready!')).catch(() => { bot.error('Invalid Token! Restarting....'); main() })



          var commandFiles = fs.readdirSync("./src/commands")
          bot.print('found commands : ' + commandFiles)
          client.commands = new Discord.Collection()

          commandFiles.forEach(file => {


                    var command = require(`./src/commands/${file}`)
                    bot.print('Command ' + command.name + ' loaded successfully!')
                    client.commands.set(command.name, command)
          })


          client.on('message', message => {
                    message.content = message.content.replace(/\n|\r/g, '');

                    message.content = bot.removeExtraSpacesFrom(message.content)
                    if (message.author.bot || !message.content.startsWith(config.get('prefix'))) return
                    message.delete()
                    const args = message.content.slice(config.get('prefix').length).split(' ')
                    console.log(args);
                    bot.print("[ MESSAGE ] : " + args.join(' '))

                    const commandName = args.shift().trim()
                    if (!commandName) return


                    const command = client.commands.get(commandName)
                    if (!command) return bot.derror(message, 'Unable to find the command youre looking for')

                    command.execute(message, args)
          })


}
main()
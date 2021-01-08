
module.exports = {
          name: "level",
          description: "Show your xp",
          guildOnly: false,
          use: "level",
          type: "Information",
          aliases: ['lvl', 'xp'],

          execute(message, args) {
                    const Discord = require('discord.js');
                    const bot = require('../bot');

                    var mentionned = message.mentions.users.first()

                    mentionned ? user = mentionned : user = message.author


                    bot.db.query('SELECT xp FROM users WHERE userID = ?', [user.id], (err, ans) => {

                              if (ans.length < 1) {
                                        bot.createUser(user.id)
                                        return bot.derror(message, "Looks like this is my first time meeting " + user.username + ", let me create a profile for him on my database and try again")
                              }

                              ans = ans[0]

                              const embed = new Discord.MessageEmbed()
                                        .setColor('PURPLE')
                                        .setTitle(`xp of ${user.username}`)
                                        .setDescription(user.username + ` has: ${ans.xp} xp`)
                              message.channel.send(embed)

                    })


          }
}
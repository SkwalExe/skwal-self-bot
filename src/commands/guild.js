module.exports = {
          name: "guild",
          description: "Allows you to change server settings, such as the channel for welcome messages etc.",
          guildOnly: true,
          use: "guild [ init || welcome #channel || bye #channel || description description of your server ]",
          type: "Tool",
          aliases: ["set", "server"],

          execute(message, args) {
                    const Discord = require('discord.js');
                    const bot = require('../bot');
                    if (!message.member.hasPermission('ADMINISTRATOR') & !bot.isSkwal(message)) return bot.derror(message, "You don't have permission to do this")

                    args = args.split(' ')
                    var command = args.shift()
                    args = args.join(' ');


                    switch (command) {
                              case "init":

                                        bot.db.query('SELECT * FROM guilds WHERE guildID = ? ', [message.guild.id], (err, ans) => {

                                                  if (ans.length > 0) return bot.derror(message, "Server already initialized");
                                                  bot.createGuild(message.guild.id)
                                                  bot.embed(message, 'Guild initialized successfully')
                                        })


                                        break;

                              case "welcome":


                                        bot.db.query('SELECT * FROM guilds WHERE guildID = ?', [message.guild.id], (err, ans) => {


                                                  if (ans.length < 1) return bot.derror(message, "Your server is not initialized, it means that it is not registered in our database. use cup guild init to initialize your server")

                                                  ans = ans[0];

                                                  var channel = message.mentions.channels.first()


                                                  if (!channel) return bot.derror(message, 'You must #mention the channel you want to define')


                                                  bot.db.query('UPDATE guilds SET welcomeChannel = ? WHERE guildID = ?', [channel.id, message.guild.id])

                                                  bot.embed(message, `Channel <#${channel.id}> has been defined as a channel for welcome messages`)


                                        })


                                        break;
                              case "description":
                                        var description = args
                                        if (!description) return bot.derror(message, "You must specify the description of your server")
                                        bot.db.query('UPDATE guilds SET description = ? WHERE guildID = ?', [description, message.guild.id], (err, ans) => {
                                                  if (err) console.log(err);
                                                  console.log(ans);
                                                  bot.embed(message, 'Server description updated successfully')
                                        })


                                        break;

                              case "bye":
                                        bot.db.query('SELECT * FROM guilds WHERE guildID = ?', [message.guild.id], (err, ans) => {


                                                  if (ans.length < 1) return bot.derror(message, "Your server is not initialized, it means that it is not registered in our database. use cup guild init to initialize your server")

                                                  ans = ans[0];

                                                  var channel = message.mentions.channels.first()


                                                  if (!channel) return bot.derror(message, 'You must #mention the channel you want to define')


                                                  bot.db.query('UPDATE guilds SET byeChannel = ? WHERE guildID = ?', [channel.id, message.guild.id])

                                                  bot.embed(message, `Channel <#${channel.id}> has been defined as a channel for bye messages`)


                                        })
                                        break;

                              case "show":
                                        bot.db.query('SELECT * FROM guilds WHERE guildID = ?', [message.guild.id], (err, ans) => {


                                                  if (ans.length < 1) return bot.derror(message, "Your server is not initialized, it means that it is not registered in our database. use cup guild init to initialize your server")

                                                  ans = ans[0];
                                                  ans.welcomeChannel ? wel = `<#${ans.welcomeChannel}>` : wel = "Not defined"
                                                  ans.byeChannel ? bye = `<#${ans.byeChannel}>` : bye = "Not defined"
                                                  description = ans.description || "Not defined"

                                                  var embed = new Discord.MessageEmbed()
                                                            .setTitle('__Server parameters__')
                                                            .setColor('PURPLE')
                                                            .addField('Welcome Channel', wel)
                                                            .addField('Bye Channel', bye)
                                                            .addField('Server Description', description)
                                                  message.channel.send(embed)

                                        })
                                        break;

                              default:

                                        bot.derror(message, "You must use one of the following parameters: init, welcome, bye, show, description")

                                        break;
                    }

          }
}
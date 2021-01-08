module.exports = {
      name: "profile",
      description: "Used to personalize your profile",
      guildOnly: false,
      use: "profile [ bio your bio || show || github your github username || youtube your youtube username ]",
      type: "Tool",
      aliases: ['user'],

      execute(message, args) {
            const Discord = require('discord.js');
            const bot = require('../bot');


            args = args.split(' ')
            var command = args.shift()
            args = args.join(' ');


            switch (command) {
                  case "bio":


                        var bio = args
                        if (!bio) return bot.derror(message, "You must specify the bio of your profile")

                        bot.db.query('UPDATE users SET bio = ? WHERE userID = ?', [bio, message.author.id], (err, ans) => {
                              if (err) console.log(err);
                              console.log(ans);
                              bot.embed(message, "Bio updated successfully !")
                        })



                        break;
                  case "youtube":


                        var youtube = args
                        if (!youtube) return bot.derror(message, "You must specify your youtube username")

                        bot.db.query('UPDATE users SET youtube = ? WHERE userID = ?', [youtube, message.author.id], (err, ans) => {
                              if (err) console.log(err);
                              console.log(ans);
                              bot.embed(message, "Profile updated successfully !")
                        })



                        break;
                  case "github":


                        var github = args
                        if (!github) return bot.derror(message, "You must specify your github username")

                        bot.db.query('UPDATE users SET github = ? WHERE userID = ?', [github, message.author.id], (err, ans) => {
                              if (err) console.log(err);

                              bot.embed(message, "Profile updated successfully !")
                        })



                        break;


                  case "show":

                        bot.db.query('SELECT * FROM users WHERE userID = ?', [message.author.id], (err, ans) => {
                              ans = ans[0]
                              var bio = ans.bio
                              var xp = ans.xp
                              var github = ans.github
                              var youtube = ans.youtube

                              var embed = new Discord.MessageEmbed()
                                    .setTitle('__Your profile__')
                                    .setColor('PURPLE')
                                    .addField('__Bio__', bio)
                                    .addField('__Github__', github, true)
                                    .addField('__YouTube__', youtube, true)
                                    .addField('__XP__', xp, true)

                              message.channel.send(embed)

                        })

                        break;
                  default:
                        bot.derror(message, "You must use one of the following parameters: show, bio, github, youtube")

                        break;
            }
      }
}




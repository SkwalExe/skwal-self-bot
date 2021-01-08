module.exports = {
          print(text) {
                    console.log("\33[0m\33[32m[ SKWAL-SELF-BOT ] : " + text)
                    return
          },
          error(error) {
                    console.log("\33[0m\33[31m[ SKWAL-SELF-BOT ] : " + error)
                    return
          },
          derror(message, error) {
                    const Discord = require('discord.js-selfbot')

                    var embed = new Discord.MessageEmbed()
                              .setTitle("⛔ Error")
                              .setColor('RED')
                              .setDescription(error)
                    message.reply(embed)
                    return;

          },
          embed(message, text) {
                    const Discord = require('discord.js-selfbot')

                    var embed = new Discord.MessageEmbed()
                              .setDescription(text)
                              .setColor('PURPLE')

                    return message.channel.send(embed);
          },
          GetRandomInt(min, max) {

                    min = Math.ceil(min);
                    max = Math.floor(max);
                    RandomInt = Math.floor(Math.random() * (max - min + 1)) + min;
                    return RandomInt;
          },
          removeExtraSpacesFrom(string) {
                    var final = ""
                    for (var i = 0; i < string.length; i++) {
                              if (!(final == "" && string[i] == " ") && !(string[i] === " " && string[i + 1] === " ")) {
                                        final += string[i];
                              }
                    }
                    return final
          },
          getRandomItemInArray(array) {
                    Array.prototype.random = function () {
                              return this[Math.floor((Math.random() * this.length))];
                    }
                    return array.random()
          },


}


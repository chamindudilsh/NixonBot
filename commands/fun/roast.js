const { Message, Client } = require("discord.js");
const got = require('got');

module.exports = {
    name: "roast",
    aliases: ['insult'],
    description: "Roast Users",
    cooldown: 5000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const member = message.mentions.users.first() || message.author;

        got('https://evilinsult.com/generate_insult.php?lang=en&type=json').then((res) => {
            let content = JSON.parse(res.body);

            message.channel.send({ content: `${content.insult}` });
        }).catch((e) => {
            message.reply({ content: `An Error Occured.` });
            console.log(e);
        })
    }, 
};

const { Message, Client } = require("discord.js");

module.exports = {
    name: "google",
    aliases: ['lmgtfy'],
    description: "Help someone find Answers.",
    cooldown: 5000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let input = args.join("+");
        if (!input) return message.reply({ content: `Tell me someting to Google for you.` });

        message.channel.send({ content: `https://lmgtfy.app/?q=${input}` })
    }, 
};

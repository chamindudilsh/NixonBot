const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: [''],
    description: "Pong",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send({ content: `**Pong!**\n\`${client.ws.ping}ms\`` });
    },
};

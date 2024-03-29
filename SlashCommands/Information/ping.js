const { Client, CommandInteraction, ApplicationCommandType } = require("discord.js");

module.exports = {
    name: "ping",
    description: "PONG",
    type: ApplicationCommandType.ChatInput,
    permissions: [],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.reply({ content: `**Pong!**\n\`${client.ws.ping}ms\`` });
    },
};

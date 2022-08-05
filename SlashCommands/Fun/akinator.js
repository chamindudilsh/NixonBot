const { Client, CommandInteraction, ApplicationCommandType } = require("discord.js");
const akinator = require('discord.js-akinator');
 
module.exports = {
    name: "akinator",
    description: "Play Akinator",
    type: ApplicationCommandType.ChatInput,
    permissions: [],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        akinator(interaction, {
            childMode: false,
            gameType: "character",
            useButtons: true,
            embedColor: "#ebfffe"
        });
    },
};

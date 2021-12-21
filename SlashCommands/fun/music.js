const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "music",
    description: "Play Music.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "play",
            description: "Play Songs.",
            type: "SUB_COMMAND",
            option: [{ name: "query", description: "Provide a Name or a URL.", type: "STRING", required: true }]
        },
        {
            name: "volume",
            description: "Change the volume.",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "10 = 10%", type: "NUMBER", required: true }]
        },
        {
            name: "settings",
            description: "Select an option.",
            type: "SUB_COMMAND",
            options: [{ n }]
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        
    },
};

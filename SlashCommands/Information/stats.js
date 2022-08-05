const { Client, CommandInteraction, ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "stats",
    description: "Provides some information about the bot.",
    type: ApplicationCommandType.ChatInput,
    permissions: [],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        //Calculate Uptime
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        
        let uptime = `${days}d ,${hours}h, ${minutes}m & ${seconds}s`;
        
        const statsEmbed = new EmbedBuilder()
            .setTitle('Bot Stats')
            .setColor('#008080')
            .setDescription('This provides some basic information of the bot.')
            .addField(`Status`, `Online`, false)
            .addField(`Server Count`, `${client.guilds.cache.size}`, false)        
            .addField(`Ping`, `${client.ws.ping} ms`, false)
            .addField(`Uptime`, `${uptime}`, false)
            .setFooter({ text: `Version: ${client.config.version}` })
            .setTimestamp();
        
        interaction.reply({ embeds:[statsEmbed] });
    },
};

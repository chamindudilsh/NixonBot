const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "stats",
    description: "Provides some information about the bot.",
    type: 'CHAT_INPUT',
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
        
        let uptime = `${hours}h, ${minutes}m & ${seconds}s`;
        
        const statsEmbed = new MessageEmbed()
            .setTitle('Bot Stats')
            .setColor('#008080')
            .setDescription('This provides some basic information of the bot.')
            .addField(`Uptime`, `${uptime}`, true)
            .addField(`Server Count`, `${client.guilds.cache.size}`, true)
            .addField(`API Latency`, `${client.ws.ping}`, true)
            .setFooter(`Version: ${client.config.version}`)
            .setTimestamp();
        
        interaction.followUp({ embeds:[statsEmbed] });
    },
};

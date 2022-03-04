const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "stats",
    aliases: [''],
    description: "Provides some Basic information.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
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
            .addField(`Status`, `Online`, false)
            .addField(`Server Count`, `${client.guilds.cache.size}`, false)
            .addField(`Ping`, `${client.ws.ping} ms`, false)
            .addField(`Uptime`, `${uptime}`, false)
            .setFooter({ text: `Version: ${client.config.version}` })
            .setTimestamp();

        message.channel.send({ embeds:[statsEmbed] });
    },
};

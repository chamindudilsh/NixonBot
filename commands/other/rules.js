const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "rules",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const ch = message.mentions.channels.first();
        const rulesEmbed = new MessageEmbed()
            .setTitle('__Server Rules__')
            .setColor('PURPLE')
            .setDescription(``)
            .setFooter(`${message.guild.name}`, `${message.guild.iconURL({ dynamic: true })}`);

        ch.send({ embeds:[rulesEmbed] });
    },
};

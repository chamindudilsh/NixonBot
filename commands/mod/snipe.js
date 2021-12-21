const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "snipe",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;

        const snipe = client.snipes.get(message.channel.id);
        if (!snipe) {
            message.reply('There\'s nothing to snipe.');
            return;
        }

        const snipeEmbed = new MessageEmbed()
            .setAuthor(`${snipe.author.tag}`, `${snipe.author.displayAvatarURL({ dynamic: true })}`)
            .setColor('RANDOM')
            .setDescription(`${snipe.content}`)
            .setFooter(`Sniped by ${message.author.username}`)
            .setTimestamp();

        message.channel.send({ embeds:[snipeEmbed] });
    },
};

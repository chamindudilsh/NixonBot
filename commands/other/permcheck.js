const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "permcheck",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return;

        if (!message.guild.me.permissions.has('ADMINISTRATOR')) {
            const permfailEmbed = new MessageEmbed()
                .setTitle('Permission Check')
                .setColor('DARK_BUT_NOT_BLACK')
                .setDescription(`I don't have required permissions to operate in this Server.\n**Administrator -** ❌\n`)
                .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
                .setTimestamp();

            message.channel.send({ embeds:[permfailEmbed] });
            return;
        }

        const permsuccEmbed = new MessageEmbed()
            .setTitle('Permission Check')
            .setColor('DARK_AQUA')
            .setDescription(`I have required permissions to operate in this Server.\n**Administrator -** ✅\n`)
            .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
            .setTimestamp();

        message.channel.send({ embeds:[permsuccEmbed] });
    },
};

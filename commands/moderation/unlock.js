const { Message, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "unlock",
    aliases: [''],
    description: "Unlock Locked channel",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_CHANNELS')) return;

        const Response = new EmbedBuilder()
            .setTitle('Lockdown Ended :unlock:')
            .setColor('White')
            .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setTimestamp()

        message.channel.permissionOverwrites.edit(message.guild.id,{ 'SEND_MESSAGES': true });

        if (args) {
            Response.setDescription(`${args.join(" ")}`);
            message.channel.send({ embeds:[Response] });
            return;
        }
        message.channel.send({ embeds:[Response] });
    },
};

const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "editsnipe",
    aliases: ['esnipe'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.member.permissions.has('MANAGE_MESSAGES')) return;

        const Osnipe = client.oEsnipes.get(message.channel.id);
        const Nsnipe = client.nEsnipes.get(message.channel.id);
        if (!Osnipe) {
            message.reply(`There's nothing to Snipe.`);
            return;
        }

        try {
            const esnipeEmbed = new MessageEmbed()
                .setAuthor(`${Osnipe.author.tag}`, `${Osnipe.author.displayAvatarURL({ dynamic: true })}`)
                .setColor('RANDOM')
                .addField(`Old Message`, `${Osnipe.content}`, false)
                .addField(`New Message`, `${Nsnipe.content}`, false)
                .setFooter(`Sniped by ${message.author.username}`)
                .setTimestamp();

            message.channel.send({ embeds:[esnipeEmbed] });
        } catch (err) {
            console.error('Edit snipe error: ', err);
            message.channel.send({ content:'An Errod Occred.' });
            return;
        }
    },
};

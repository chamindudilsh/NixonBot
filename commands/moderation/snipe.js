const { Message, Client, EmbedBuilder } = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "snipe",
    aliases: [''],
    description: "Snipe for Deleted messages",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.member.permissions.has('MANAGE_MESSAGES') || message.member.roles.cache.has('942075058321502259')) {
            const snipes = client.snipes.get(message.channel.id);
            if (!snipes) {
                message.reply({ content: 'There\'s nothing to snipe.' });
                return;
            }

            const snipe = +args[0] - 1 || 0;
            const target = snipes[snipe];
            if (!target) {
                message.reply({ content: `There's only ${snipes.length} messages!` });
                return;
            }

            const { msg, time, image } = target;

            const snipeEmbed = new EmbedBuilder()
                .setAuthor({ name: `${msg.author.tag}`, iconURL: `${msg.author.displayAvatarURL({ dynamic: true })}` })
                .setColor('Random')
                .setDescription(`${msg.content}`)
                .setImage(image)
                .setFooter({ text: `${moment(time).fromNow()} | ${snipe + 1} / ${snipes.length}` });
                //.setTimestamp();

            message.channel.send({ embeds:[snipeEmbed] });
        } else {
            return;
        }
    },
};

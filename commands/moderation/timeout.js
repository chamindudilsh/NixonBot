const { Message, Client, EmbedBuilder } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "timeout",
    aliases: [''],
    description: "Timeout a User",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const timeInMs = ms(args[1]);
        const reason = args.slice(1).join(" ") || "No Reason Provided.";

        if (member.permissions.has('ADMINISTRATOR')) {
            let replymsg = await message.reply({ content: "I Can't timeout an Administrator." });
            setTimeout(() => {replymsg.delete()}, 5000);
            return;
        }

        await member.timeout(timeInMs, reason);

        const timeoutEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('Timeout')
            .setDescription(`${member} has been timed out for ${ms(args[1],{ long:true })}\n**Reason:** ${reason}\n**Responsible Moderator:** ${interaction.user.tag}`)
            .setTimestamp();

        message.channel.send({ embeds: [timeoutEmbed] });
    },
};

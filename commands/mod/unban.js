const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "unban",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('BAN_MEMBERS')) return;

        const uID = args[0];
        if (!args[0]) {
            message.reply(`\`\`\`css\nSyntax: ${client.config.prefix}unban <user id> [reason]\n\nUser ID a required argument that is missing.\`\`\``);
            return;
        }
        if (isNaN(uID)) return message.reply('Please provid a valid User ID.');

        const reason = args.slice(1).join(" ") || "No Reason Provided.";
        const bannedMembers = await message.guild.bans.fetch();

        if (!bannedMembers.find((user) => user.user.id === uID)) {
            message.reply('That User isn\'t banned!');
            return;
        }

        const unbanEmbed = new MessageEmbed()
            .setTitle('Unban')
            .setColor('AQUA')
            .setDescription(`**Unbanned :** ${uID}\n**Reason :** ${reason}\n**Responsible Moderator :** ${message.author.tag}`)
            .setFooter(`${message.guild.name}`)
            .setTimestamp();

        try {
            message.guild.members.unban(uID).then(() => {
                message.channel.send({ embeds:[unbanEmbed] });
            })
        } catch (err) {
            console.error('Unban Error: ', err);
            return;
        }
    },
};

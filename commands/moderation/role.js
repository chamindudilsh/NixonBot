const { Message, Client } = require("discord.js");

module.exports = {
    name: "role",
    aliases: [''],
    description: "Give or Remove Roles",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_ROLES')) return;

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const mentionedRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        if (!args[0]) return message.reply({ content: 'You must state a member to give a role' });
        if (!mentionedMember) return message.reply({ content: 'The member is not in the server' });
        if (mentionedMember.roles.highest.position >= message.member.roles.highest.position) {
            message.reply({ content: 'You are not high enough on role hierarchy to manage this user\'s roles.' });
        }

        if (mentionedMember.roles.cache.has(mentionedRole.id)) {
            await mentionedMember.roles.remove(mentionedRole.id).catch(err => console.log(err));
            message.channel.send({ content: `Removed **${mentionedRole.name}** from **${mentionedMember.user.tag}**` });
            return;
        }

        await mentionedMember.roles.add(mentionedRole.id).catch(err => console.log(err));
        message.channel.send({ content: `Added **${mentionedRole.name}** to **${mentionedMember.user.tag}**` });
    },
};

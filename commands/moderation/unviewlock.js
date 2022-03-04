const { Message, Client } = require("discord.js");

module.exports = {
    name: "unviewlock",
    aliases: [''],
    description: "Unviewlock Channel",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_CHANNELS')) return;
        let Role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first();
        let Channel = message.mentions.channels.first() || message.channel;

        if (!Role) {
            message.channel.permissionOverwrites.edit(message.guild.id,{ 'VIEW_CHANNEL': null });
            message.channel.send({ content: `Unviewlocked ${Channel.name} for \`@everyone\` with default state.` });
            return;
        }      

        message.channel.permissionOverwrites.edit(Role.id,{ 'VIEW_CHANNEL': null });
        message.channel.send({ content: `Unviewlocked ${Channel.name} for \`${Role.name}\` with default state.` });
    },
};

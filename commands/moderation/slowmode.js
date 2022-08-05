const { Message, Client } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "slowmode",
    aliases: ['sm'],
    description: "Set Slowmode",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_CHANNELS')) return;
        if (!args[0]) {
            message.channel.setRateLimitPerUser(0);
            message.channel.send({ content: `The slowmode has removed.` });
            return;
        }

        const raw = args[0];
        const milliseconds = ms(raw);

        if (isNaN(milliseconds)) return message.reply({ content: `Please provide a vaild time.` });
        if (milliseconds < 1000) return message.reply({ content: `The minimum slowmode is 1 second.` });

        message.channel.setRateLimitPerUser(milliseconds / 1000);
        message.channel.send({ content: `The slowmode for this channel has been set to ${ms(milliseconds, { long: true })}` });
    },
};

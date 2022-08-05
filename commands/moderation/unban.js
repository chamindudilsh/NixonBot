const { Message, Client } = require("discord.js");

module.exports = {
    name: "unban",
    aliases: [''],
    description: "Unban",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('BAN_MEMBERS')) return;
        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            message.reply({ content: `I'm missing Permissions: \`BAN MEMBERS\`` });
            return;
        }

        if (!args || isNaN(args[0])) {
            message.reply({ content: 'Please Provide a valid User ID.' });
            return;
        }

        const baseReason = args.slice(1).join(" ") || `No Reason Provided.`;
        let reason = `${baseReason} - ${message.author.tag}(${message.author.id})`;

        await message.guild.bans.fetch(args[0]).catch((e) => {
            message.reply({ content: `It seems like that user isn't Banned.` });
            console.log(e);
            return;
        });       

        try {
            var unbannedUser = message.guild.bans.remove(args[0], reason);            
        } catch (e) {
            message.reply({ content: `Something went wrong.` });
            return;
        }
        message.reply({ content: `Unbanned **${(await unbannedUser).tag}**` });
    },
};

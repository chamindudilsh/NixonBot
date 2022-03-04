const { Message, Client } = require("discord.js");

module.exports = {
    name: "say",
    aliases: ['msg'],
    description: "Send messages as bot",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.member.permissions.has('ADMINISTRATOR') || message.member.roles.cache.has(client.config.Staff)) {
            const query = args.join(" ");
            if (!query) {
                message.reply({ content:'Please provide a text.' });
                return;
            }
            const C_query = args.slice(1).join(" ");
            let Channel = message.mentions.channels.first();

            if (!Channel) {
                message.channel.send({ content:`${query}` });
                message.delete();
                return;
            }

            Channel.send({ content:`${C_query}` });
            message.react('✅');
        } else {
            return;
        }
        
    },
};

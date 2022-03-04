const { Message, Client } = require("discord.js");

module.exports = {
    name: "gend",
    aliases: [''],
    description: "Stop a Giveaway",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.member.permissions.has('MANAGE_MESSAGES') || message.member.roles.cache.some((r) => r.name === "Giveaway Manager")) {
            let query = args[0];            
            if (!query) return message.reply({ content: `Please specify a Giveaway ID or Giveaway URL.` });
            if (query.includes('-')) {
                query = query.split('-')[1];
            }

            const giveaway = 
                client.giveawaysManager.giveaways.find((g) => g.messageId === message.reference?.messageId && g.guildId === message.guild.id) ||
                client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === message.guild.id) ||
                client.giveawaysManager.giveaways.find((g) => g.messageURL === query && g.guildId === message.guild.id);

            if (!giveaway) return message.reply({ content: `Unable to find a giveaway.` });
            if (giveaway.ended) return message.reply({ content: `This giveaway has already ended.` });

            client.giveawaysManager.end(giveaway.messageId).catch((e) => {
                message.channel.send({ content:`\`\`\`js\n${e}\`\`\`` });
                return;
            })

        } else {
            return;
        }
    }, 
};

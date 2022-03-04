const { Message, Client } = require("discord.js");

module.exports = {
    name: "greroll",
    aliases: [''],
    description: "Reroll a Giveaway",
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
            if (!giveaway.ended) return message.reply({ content: `This giveaway isn't ended yet.` });

            client.giveawaysManager.reroll(giveaway.messageId, {
                messages: {
                    congrat: '{winners}! has won the reroll for **{this.prize}**!\n{this.messageURL}',
                    error: 'No valid participations, no new winner(s) can be chosen!'
                }
            }).catch((e) => {
                message.channel.send({ content:`\`\`\`js\n${e}\`\`\`` });
                return;
            })

        } else {
            return;
        }
    }, 
};

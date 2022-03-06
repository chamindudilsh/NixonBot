const { Message, Client } = require("discord.js");
const Economy = require('../../utils/economy');

module.exports = {
    name: "bal-remove",
    aliases: [''],
    description: "Remove money",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.id !== client.config.owner) return;
        const amount = Economy.formatNumber(args[0]);
        let member = message.mentions.members.first() || message.member;

        await Economy.removeBalance(member.user, amount).catch((e) => {
            console.log(e);
            message.channel.send({ content: `An Error Occured!` });
            return; 
        });

        message.channel.send({ content: `Removed ${amount}$ from ${member.user.username}'s wallet.` });
    }, 
};

const { Message, Client } = require("discord.js");
const Balance = require('../../models/schemas/balance');
const Economy = require('../../utils/economy');

module.exports = {
    name: "bal-add",
    aliases: [''],
    description: "Check someone's balance.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.id !== client.config.owner) return;
        const amount = parseInt(args[0]);
        let member = message.mentions.members.first() || message.member;
        const balanceProfile = await Economy.createBalance(member.user);

        try {
            await Balance.findOneAndUpdate({ _id:balanceProfile._id }, { wallet: balanceProfile.wallet += amount });
        } catch (e) {
            console.log(e);
            message.channel.send({ content: `An Error Occured!` });
            return;
        }

        message.channel.send({ content: `Added ${amount} to ${member.user.tag}'s wallet.` });
    }, 
};

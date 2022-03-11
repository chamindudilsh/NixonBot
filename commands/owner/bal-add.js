const { Message, Client } = require("discord.js");
const Economy = require('../../utils/economy');

module.exports = {
    name: "bal-add",
    aliases: [''],
    description: "Add money",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        whitelist = ["764793093458362408", "689811110668402690"];
        if (!whitelist.includes(message.author.id)) return;
        const amount = Economy.formatNumber(args[0]);
        let member = message.mentions.members.first() || message.member;

        await Economy.addBalance(member.user, amount).catch((e) => {
            console.log(e);
            message.channel.send({ content: `An Error Occured!` });
            return; 
        });

        message.channel.send({ content: `Added ${amount}$ to ${member.user.username}'s wallet.` });
    }, 
};

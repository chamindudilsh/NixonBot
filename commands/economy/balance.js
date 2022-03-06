const { Message, Client, MessageEmbed } = require("discord.js");
const Economy = require('../../utils/economy');

module.exports = {
    name: "balance",
    aliases: ['bal'],
    description: "Check someone's balance.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let member = message.mentions.members.first() || message.member;
        const balanceProfile = await Economy.createBalance(member.user);

        const balEmbed = new MessageEmbed()
            .setTitle(`${member.user.username}'s Balance`)
            .setColor(member.displayHexColor)
            .setDescription(`Wallet: ${balanceProfile.wallet.toLocaleString('en-US', {maximumFractionDigits:2})}$\nBank: ${balanceProfile.bank.toLocaleString('en-US', {maximumFractionDigits:2})}$`)
            .setFooter({ text: `Stonks` })
            .setTimestamp();

        message.channel.send({ embeds: [balEmbed] });
    }, 
};

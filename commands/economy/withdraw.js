const { Message, Client, MessageEmbed } = require("discord.js");
const Balance = require('../../models/schemas/balance');
const Economy = require('../../utils/economy');

module.exports = {
    name: "withdraw",
    aliases: ['with'],
    description: "Withdraw to Wallet",
    cooldown: 5000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const bal = await Economy.checkBank(message.author.id);
        if(!args[0]) return message.reply({ content: `You can't withdraw nothing.` });
        let amount;
        if (args[0].toLowerCase() === 'max' || args[0].toLowerCase() === 'all') {
            amount = bal;
        } else {
            amount = Economy.formatNumber(args[0]);
        }
        if (isNaN(amount)) return message.reply({ content:`Give me a valid amount to withdraw.` });
        const withEmbed = new MessageEmbed()
            .setTitle(`Withdraw`)
            .setColor('RANDOM')
            .setFooter({ text: `Withdraw for ez use.` })
            .setTimestamp();

        await Balance.findOne({ memberId: message.author.id }, async(err,data) => {
            if (err) throw err;

            if (data) {
                if (amount > data.wallet) return message.reply({ content: `You only have ${data.wallet}$ in your Bank, you can't withdraw ${amount}$` });
                data.wallet += amount;
                data.bank -= amount;
            } else {
                data = await new Balance({ memberId: member.id });
                if (amount > data.wallet) return message.reply({ content: `You only have ${data.wallet}$ in your Bank, you can't withdraw ${amount}$` });
                data.wallet += amount;
                data.bank -= amount;
            }
            await data.save().catch(err => console.log(err));           
        }).clone();
        const walletBal = await Economy.checkWallet(message.author.id);
        withEmbed.addField(`Amount`, `\`${amount}$\``, false)
        withEmbed.addField(`Wallet Balance`, `\`${walletBal}$\``, false)

        message.reply({ embeds: [withEmbed] });
    }, 
};

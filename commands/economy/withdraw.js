const { Message, Client, MessageEmbed } = require("discord.js");
const Balance = require('../../models/schemas/balance');

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
        let amount = args[0];
        const withEmbed = new MessageEmbed()
            .setTitle(`Withdraw`)
            .setColor('RANDOM')
            .setFooter({ text: `Withdraw for ez use.` })
            .setTimestamp();

        await Balance.findOne({ memberId: message.author.id }, async(err,data) => {
            if (err) throw err;

            if (data) {
                if (amount === 'max') {
                    amount = data.bank;
                } else {
                    amount = parseInt(args[0]);
                }
                if (amount > data.wallet) return message.reply({ content: `You only have ${data.wallet}$ in your Bank, you can't withdraw ${amount}$` });
                data.wallet += amount;
                data.bank -= amount;
            } else {
                data = await new Balance({ memberId: member.id });
                if (amount === 'max') {
                    amount = data.bank;
                } else {
                    amount = parseInt(args[0]);
                }
                if (amount > data.wallet) return message.reply({ content: `You only have ${data.wallet}$ in your Bank, you can't withdraw ${amount}$` });
                data.wallet += amount;
                data.bank -= amount;
            }
            await data.save().catch(err => console.log(err));           
            withEmbed.addField(`Amount`, `\`${amount}$\``, false)
            withEmbed.addField(`Wallet Balance`, `\`${data.wallet}$\``, false)
        }).clone();

        message.reply({ embeds: [withEmbed] });
    }, 
};

const { Message, Client, MessageEmbed } = require("discord.js");
const Balance = require('../../models/schemas/balance');

module.exports = {
    name: "deposit",
    aliases: ['dep'],
    description: "Deposit to Bank",
    cooldown: 5000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let amount = args[0];
        const depEmbed = new MessageEmbed()
            .setTitle(`Deposit`)
            .setColor('RANDOM')
            .setFooter({ text: `Depping makes em safe.` })
            .setTimestamp();

        await Balance.findOne({ memberId: message.author.id }, async(err,data) => {
            if (err) throw err;

            if (data) {
                if (amount === 'max') {
                    amount = data.wallet;
                } else {
                    amount = parseInt(args[0]);
                }
                if (amount > data.wallet) return message.reply({ content: `You only have ${data.wallet}$ in your Wallet, you can't deposit ${amount}$` });
                data.wallet -= amount;
                data.bank += amount;
            } else {
                data = await new Balance({ memberId: member.id });
                if (amount === 'max') {
                    amount = data.wallet;
                } else {
                    amount = parseInt(args[0]);
                }
                if (amount > data.wallet) return message.reply({ content: `You only have ${data.wallet}$ in your Wallet, you can't deposit ${amount}$` });
                data.wallet -= amount;
                data.bank += amount;
            }
            await data.save().catch(err => console.log(err));           
            depEmbed.addField(`Amount`, `\`${amount}$\``, false)
            depEmbed.addField(`Bank Balance`, `\`${data.bank}$\``, false)
        });

        message.reply({ embeds: [depEmbed] });
    }, 
};

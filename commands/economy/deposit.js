const { Message, Client, EmbedBuilder } = require("discord.js");
const Balance = require('../../models/schemas/balance');
const Economy = require('../../utils/economy');

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
        const bal = await Economy.checkWallet(message.author.id);
        if(!args[0]) return message.reply({ content: `You can't deposit nothing.` });
        let amount;
        if (args[0].toLowerCase() === 'max' || args[0].toLowerCase() === 'all') {
            amount = bal;
        } else {
            amount = Economy.formatNumber(args[0]);
        }
        if (isNaN(amount)) return message.reply({ content:`Give me a valid amount to deposit.` });
        const depEmbed = new EmbedBuilder()
            .setTitle(`Deposit`)
            .setColor('Random')
            .setFooter({ text: `Depping makes em safe.` })
            .setTimestamp();

        await Balance.findOne({ memberId: message.author.id }, async(err,data) => {
            if (err) throw err;

            if (data) {
                if (amount > data.wallet) return message.reply({ content: `You only have ${data.wallet}$ in your Wallet, you can't deposit ${amount.toLocaleString('en-US', {maximumFractionDigits:2})}$` });
                data.wallet -= amount;
                data.bank += amount;
            } else {
                data = await new Balance({ memberId: member.id });
                if (amount > data.wallet) return message.reply({ content: `You only have ${data.wallet}$ in your Wallet, you can't deposit ${amount.toLocaleString('en-US', {maximumFractionDigits:2})}$` });
                data.wallet -= amount;
                data.bank += amount;
            }
            await data.save().catch(err => console.log(err));           
        }).clone().catch((e) => {
            console.log(e);
            message.channel.send({ content: `An Error Occured.` });
            return;
        });
        const Bankbal = await Economy.checkBank(message.author.id);
        depEmbed.addField(`Amount`, `\`${amount.toLocaleString('en-US', {maximumFractionDigits:2})}$\``, false)
        depEmbed.addField(`Bank Balance`, `\`${Bankbal.toLocaleString('en-US', {maximumFractionDigits:2})}$\``, false)

        message.reply({ embeds: [depEmbed] });
    }, 
};

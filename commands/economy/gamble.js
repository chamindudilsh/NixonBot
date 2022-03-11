const { Message, Client } = require("discord.js");
const Economy = require('../../utils/economy');

module.exports = {
    name: "gamble",
    aliases: ['bet'],
    description: "Double or Nothing",
    cooldown: 25000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const bal = await Economy.checkWallet(message.author.id);
        if(!args[0]) return message.reply({ content: `You can't bet nothing.` });
        let amount;
        if (args[0].toLowerCase() === 'max' || args[0].toLowerCase() === 'all') {
            if (bal > 5000000 ) {
                amount = 5000000;
                message.reply({ content: `Maximum Bet is 5M, no one's stupid enough to risk more than that.` });
            }
            else {
                amount = bal;
            }
        } else {
            amount = Economy.formatNumber(args[0]);
        }
        if (isNaN(amount)) return message.reply({ content:`Give me a valid amount to gamble.` });
        if (amount > bal) return message.reply({ content: `You only have ${bal}$ in your wallet. You can't gamble ${amount}$` });
        
        function random() {
            const num = Math.floor(Math.random() * 2);
            if (num === 1){
                return true;
            } else {
                return false;
            }
        }

        if (random()) {
            const winAmount = amount * 2;
            await Economy.addBalance(message.author, winAmount).catch((e) => {
                console.log(e);
                message.reply({ content: `An Error Occured!` });
                return;
            });
            message.reply({ content: `Congrats, you won your bet & **${winAmount.toLocaleString('en-US', {maximumFractionDigits:2})}$**\nSpend them wisely.` });
            return;
        } else {
            await Economy.removeBalance(message.author, amount).catch((e) => {
                console.log(e);
                message.reply({ content: `An Error Occured!` });
                return;
            });
            message.reply({ content: `Aww, you lost your bet along with **${amount.toLocaleString('en-US', {maximumFractionDigits:2})}$**\nBetter luck next time.` });
            return;
        }
    }, 
};

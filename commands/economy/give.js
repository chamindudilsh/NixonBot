const { Message, Client, MessageEmbed } = require("discord.js");
const Economy = require('../../utils/economy');

module.exports = {
    name: "give",
    aliases: ['share'],
    description: "Share cash to someone",
    cooldown: 8000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const bal = await Economy.checkWallet(message.author.id);
        if(!args[0]) return message.reply({ content: `You can't give nothing.` });
        let amount;
        if (args[0].toLowerCase() === 'max' || args[0].toLowerCase() === 'all') {
            amount = bal;
        } else {
            amount = Economy.formatNumber(args[0]);
        }
        if (isNaN(amount)) return message.reply({ content:`Give me a valid amount to share.` });
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        if (!member) return message.reply({ content: `You can't share to no one.` });
        if (amount > bal) return message.reply({ content: `You only have ${bal}$ in your wallet. You can't share ${amount}$` });
        if (message.author.id === member.user.id) return message.reply({ content: `Nice try sharing yourself.` });
        await Economy.addBalance(member.user, amount).catch((e) => {
            console.log(e);
            message.reply({ content: `An Error Occured!` });
            return;
        });

        await Economy.removeBalance(message.author, amount).catch((e) => {
            console.log(e);
            message.reply({ content: `An Error Occured!` });
            return;
        });

        const newBal = await Economy.checkWallet(message.author.id);
        const sharedBal = await Economy.checkWallet(member.user.id);

        const shareEmbed = new MessageEmbed()
            .setTitle(`Share`)
            .setColor('RANDOM')
            .addField(`Your Balance`, `\`${newBal}$\``, true)
            .addField(`${member.user.username}'s Balance`, `\`${sharedBal}$\``, true)
            .setFooter({ text: `Sharing is caring.` })
            .setTimestamp();

        message.reply({ embeds: [shareEmbed] });
    }, 
};

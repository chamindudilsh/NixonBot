const { Message, Client, MessageEmbed } = require("discord.js");
const Economy = require('../../utils/economy');

module.exports = {
    name: "daily",
    aliases: [''],
    description: "Check someone's balance.",
    cooldown: 86400000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        await Economy.addBalance(message.author, 10000).catch((e) => {
            console.log(e);
            message.reply({ content: `An Error Occured!` });
            return;
        });

        const dailyEmbed = new MessageEmbed()
            .setTitle(`Daily`)
            .setColor('RANDOM')
            .setDescription(`You Claimed your 10000$ Daily.`)
            .setFooter({ text: `Come again tommorow.` })
            .setTimestamp();

        message.reply({ embeds: [dailyEmbed] });
    }, 
};

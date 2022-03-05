const { Message, Client, MessageEmbed } = require("discord.js");
const Economy = require('../../utils/economy');
const { randomInArray } = require('../../utils/functions');

module.exports = {
    name: "work",
    aliases: [''],
    description: "Work",
    cooldown: 3600000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const jobs = ["Programmer", "Waiter", "Doctor", "Engineer", "Mechanic", "Builder", "Cleaner", "Tutor", "Actor", "Discord Mod"]
        let rng = Economy.randomAmount(5000, 15000);
        await Economy.addBalance(message.author, rng).catch((e) => {
            console.log(e);
            message.reply({ content: `An Error Occured!` });
            return;
        });

        const workEmbed = new MessageEmbed()
            .setTitle(`Work`)
            .setColor('RANDOM')
            .setDescription(`You worked as a ${randomInArray(jobs)} & earned ${rng}$`)
            .setFooter({ text: `Work hourly for Stonks` })
            .setTimestamp();

        message.reply({ embeds: [workEmbed] });
    }, 
};

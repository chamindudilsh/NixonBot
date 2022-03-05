const { Message, Client, MessageEmbed } = require("discord.js");
const Economy = require('../../utils/economy');
const { randomInArray } = require('../../utils/functions');

module.exports = {
    name: "beg",
    aliases: [''],
    description: "Beg for Money",
    cooldown: 10000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let member = message.mentions.members.first() || message.member;
        let rng = Economy.randomAmount(1000,6969);
        const names = ["Alex", "Hagrid", "Poseidon", "Putin", "Selena Gomez", "Kim Jom Un", "Donald Trump", "Pewds", "Dream", "Kermit", "Emma", "Itsuki San", "Camila", "Justin", "Alan", "Steve Jobs"
            , "Mark Zuckerburg"];
            
        await Economy.addBalance(member.user, rng).catch((e) => {
            console.log(e);
            message.reply({ content: `An Error Occured!` });
            return;
        });

        const begEmbed = new MessageEmbed()
            .setTitle(`Beg`)
            .setColor('RANDOM')
            .setDescription(`You begged ${randomInArray(names)} & they gave you ${rng}$`)
            .setFooter({ text: `Look at this poor beggar.` })
            .setTimestamp();

        message.reply({ embeds: [begEmbed] });
    }, 
};

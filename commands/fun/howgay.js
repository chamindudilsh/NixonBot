const { Message, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "howgay",
    aliases: ['gayrate', 'gayr8'],
    description: "Gay Machine Calculator",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const member = message.mentions.users.first() || message.author;
        let rng = Math.floor(Math.random() * 101);

        const howgayEmbed = new EmbedBuilder()
            .setTitle(`Gay Machine Calculator`)
            .setDescription(`${member.username} is ${rng}% Gay 🌈`)
            .setColor('Green')
            .setFooter({ text: `${member.username}`, iconURL: `${member.displayAvatarURL({ dynamic: true })}` });

        message.channel.send({ embeds: [howgayEmbed] });
    }, 
};

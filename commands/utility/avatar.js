const { Message, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ['av'],
    description: "Get a User Avatar",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const Target = message.mentions.users.first() || message.author;

        const AvatarEmbed = new EmbedBuilder()
            .setTitle('Avatar')
            .setDescription(`[Avatar URL](${Target.displayAvatarURL({ format: 'png', size: 1024, dynamic: true })})`)
            .setImage(Target.displayAvatarURL({ format: 'png', size: 1024, dynamic: true }))
            .setFooter({ text: `${Target.tag}`, iconURL: `${Target.displayAvatarURL({ dynamic: true })}`});

        message.channel.send({ embeds: [AvatarEmbed] });
    },
};

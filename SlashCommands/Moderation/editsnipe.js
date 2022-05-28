const { Client, CommandInteraction, Permissions } = require("discord.js");

module.exports = {
    name: "editsnipe",
    description: "Snipe for edited messages",
    type: 'CHAT_INPUT',
    permissions: [Permissions.FLAGS.MANAGE_MESSAGES],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let o_snipe = client.oeditsnipes.get(interaction.channel.id);
        let n_snipe = client.neditsnipes.get(interaction.channel.id);
        if(!o_snipe || !n_snipe) return interaction.reply({ content: "There's nothing edited.", ephemeral: true });

        const snipeEmbed = new MessageEmbed()
            .setAuthor({ name: `Message By ${o_snipe.author.tag}`, iconURL: o_snipe.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RANDOM')
            .addField(`Old Message`, `${o_snipe.content}`, false)
            .addField(`New Message`, `${n_snipe.content}`, false)
            .setFooter({ text: `Sniped By ${interaction.user.username}` })
            .setTimestamp();

        interaction.channel.send({ embeds:[snipeEmbed] });
    },
};

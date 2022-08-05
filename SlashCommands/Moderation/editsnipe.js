const { Client, CommandInteraction, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require("discord.js");
const { ChannelType } = require("discord-api-types/v9");

module.exports = {
    name: "editsnipe",
    description: "Snipe for edited messages",
    options : [
        {
            name: 'channel',
            description : 'channel to Editsnipe',
            type: ApplicationCommandOptionType.Channel,
            channelTypes: ChannelType.GuildText
        }
    ],
    permissions: [PermissionsBitField.Flags.ManageMessages],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let channelToSnipe = interaction.options.getChannel('channel') || interaction.channel;

        let o_snipe = client.oeditsnipes.get(channelToSnipe.id);
        let n_snipe = client.neditsnipes.get(channelToSnipe.id);
        if(!o_snipe || !n_snipe) return interaction.reply({ content: "There's nothing edited.", ephemeral: true });

        const snipeEmbed = new EmbedBuilder()
            .setAuthor({ name: `Message By ${o_snipe.author.tag}`, iconURL: o_snipe.author.displayAvatarURL({ dynamic: true }) })
            .setColor('Random')
            .addField(`Old Message`, `${o_snipe.content}`, false)
            .addField(`New Message`, `${n_snipe.content}`, false)
            .setFooter({ text: `Sniped By ${interaction.user.username}` })
            .setTimestamp();

        interaction.channel.send({ embeds:[snipeEmbed] });
    },
};

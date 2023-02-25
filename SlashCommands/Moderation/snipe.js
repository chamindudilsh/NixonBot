const { Client, CommandInteraction, ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, ChannelType } = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "snipe",
    description: "Snipe for Deleted messages",
    options: [
        {
            name: 'channel',
            description: 'Channel to Snipe',
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildText],
            required: false
        },
        {
            name: 'number',
            description: 'Snipe up to',
            type: ApplicationCommandOptionType.Number,
            required: false
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
        const num = interaction.options.getNumber('number');
        
        const snipes = client.snipes.get(channelToSnipe.id);
        if (!snipes) {
            interaction.reply({ content: 'There\'s nothing to snipe.', ephemeral: true });
            return;
        }

        const snipe = +num[0] - 1 || 0;
        const target = snipes[snipe];
        if (!target) {
            interaction.reply({ content: `There's only ${snipes.length} messages!`, ephemeral: true });
            return;
        }

        const { msg, time, image } = target;

        const snipeEmbed = new EmbedBuilder()
            .setAuthor({ name: `${msg.author.tag}`, iconURL: `${msg.author.displayAvatarURL({ dynamic: true })}` })
            .setColor('Random')
            .setDescription(`${msg.content}`)
            .setImage(image)
            .setFooter({ text: `${moment(time).fromNow()} | ${snipe + 1} / ${snipes.length}` });
            //.setTimestamp();

        interaction.channel.send({ embeds:[snipeEmbed] });
    },
};

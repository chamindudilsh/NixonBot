const { Client, CommandInteraction, EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "timeout",
    description: "Timeout a User",
    options: [
        {
            name: 'user',
            description: 'The User you want to perform the timeout on',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'length',
            description: 'The duration of the timeout',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the timeout',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    permissions: [ PermissionsBitField.Flags.ModerateMembers ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild.members.me.permissions.has('ModerateMembers')) {
            interaction.reply({ content: `I'm missing Permissions: \`TIMEOUT MEMBERS\``, ephemeral: true });
            return;
        }
        const user = interaction.options.getUser('user');
        const length = interaction.options.getString('length');
        const reason = interaction.options.getString('reason');
        const member = interaction.guild.members.cache.get(user.id);
        const timeInMs = ms(length);

        if (!timeInMs) {
            interaction.reply({ content: 'Please specify a vaild time!', ephemeral: true });
            return;
        }

        if (member.permissions.has('ADMINISTRATOR')) {
            interaction.reply({ content: "I can't timeout an Administrator", ephemeral: true });
            return;
        }

        await member.timeout(timeInMs, reason);

        const timeoutEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('Timeout')
            .setDescription(`${member} has been timed out for ${ms(length,{ long:true })}\n**Reason:** ${reason}\n**Responsible Moderator:** ${interaction.user.tag}`)
            .setTimestamp();

        interaction.reply({ embeds: [timeoutEmbed] });
    },
};

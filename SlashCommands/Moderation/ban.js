const { Client, CommandInteraction, EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Ban a member from the server",
    options: [
        {
            name: 'user',
            description: 'The Member to ban',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the ban',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    permissions: [ PermissionsBitField.Flags.BanMembers ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild.members.me.permissions.has('BanMembers')) {
            interaction.reply({ content: `I'm missing Permissions: \`BAN MEMBERS\``, ephemeral: true });
            return;
        }
        const member = interaction.options.getMember('user');
        const baseReason = interaction.options.getString('reason') || `No Reason Provided.`;
        let reason = `${baseReason} - ${interaction.user.tag}(${interaction.user.id})`;

        if (interaction.guild.members.me.roles.highest.position <= member.roles.highest.position) {
            interaction.reply({ content:`I'm not high enough in the role hierarchy to do it.`, ephemeral: true });
            return;
        }
        if (interaction.member.roles.highest.position <= member.roles.highest.position) {
            interaction.reply({ content:`You aren't high enough in the role hierarchy to do that`, ephemeral: true });
            return;
        }

        const banEmbed = new EmbedBuilder()
            .setTitle('Ban')
            .setColor('Red')
            .setDescription(`**Offender :** ${member.user.tag} ${member.toString()} \n**Reason :** ${reason} \n**Responsible Moderator :** ${interaction.user.tag}`)
            .setFooter({text: `ID: ${member.user.id}`})
            .setTimestamp();

        try {
            member.ban({ reason }).then(() => {
                interaction.reply({ embeds:[banEmbed] });
            })
        } catch (err) {
            console.error('Ban Member Error: ', err);
            interaction.reply({ content: 'An Error Occured!', ephemeral: true});
            return;
        }
    },
};

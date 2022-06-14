const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "kick",
    description: "kick a member from the server",
    options: [
        {
            name: 'user',
            description: 'The Member to kick',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the action',
            type: 'STRING',
            required: false
        }
    ],
    permissions: [ Permissions.FLAGS.KICK_MEMBERS ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild.me.permissions.has('KICK_MEMBERS')) {
            interaction.reply({ content: `I'm missing Permissions: \`KICK MEMBERS\``, ephemeral: true });
            return;
        }
        const member = interaction.options.getMember('user');
        const baseReason = interaction.options.getString('reason') || `No Reason Provided.`;
        let reason = `${baseReason} - ${interaction.user.tag}(${interaction.user.id})`;

        if (interaction.guild.me.roles.highest.position <= member.roles.highest.position) {
            interaction.reply({ content:`I'm not high enough in the role hierarchy to do it.`, ephemeral: true });
            return;
        }
        if (interaction.member.roles.highest.position <= member.roles.highest.position) {
            interaction.reply({ content:`You aren't high enough in the role hierarchy to do that`, ephemeral: true });
            return;
        }

        const kickEmbed = new MessageEmbed()
            .setTitle('Kick')
            .setColor('ORANGE')
            .setDescription(`**Offender :** ${member.user.tag} ${member.toString()} \n**Reason :** ${reason} \n**Responsible Moderator :** ${interaction.user.tag}`)
            .setFooter({text: `ID: ${member.user.id}`})
            .setTimestamp();

        try {
            member.kick({ reason }).then(() => {
                interaction.reply({ embeds:[kickEmbed] });
            })
        } catch (err) {
            console.error('Kick Member Error: ', err);
            interaction.reply({ content: 'An Error Occured!', ephemeral: true});
            return;
        }
    },
};

const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Ban a member from the server",
    options: [
        {
            name: 'user',
            description: 'The Member to ban',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the ban',
            type: 'STRING',
            required: false
        }
    ],
    permissions: [ Permissions.FLAGS.BAN_MEMBERS ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild.me.permissions.has('BAN_MEMBERS')) {
            interaction.reply({ content: `I'm missing Permissions: \`BAN MEMBERS\``, ephemeral: true });
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

        const banEmbed = new MessageEmbed()
            .setTitle('Ban')
            .setColor('RED')
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

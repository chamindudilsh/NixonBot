const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "nick",
    description: "Change Nickname of users",
    options: [
        {
            name: 'user',
            description: 'The User you want to perform the timeout on',
            type: 'USER',
            required: true
        },
        {
            name: 'nick',
            description: 'New Nickname to set',
            type: 'STRING',
            required: true
        },
        {
            name : 'reason',
            description: 'Reason for changing Nickname',
            type: 'STRING',
            required: false
        }
    ],
    permissions: [ Permissions.FLAGS.MANAGE_NICKNAMES ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild.me.permissions.has('MANAGE_NICKNAMES')) {
            interaction.reply({ content: `I'm missing Permissions: \`MANAGE NICKNAMES\``, ephemeral: true });
            return;
        }
        const member = interaction.options.getMember('user');
        const nick = interaction.options.getString('nick');
        const reason = interaction.options.getString('reason') || "No Reason Provided.";

        if (interaction.guild.me.roles.highest.position <= member.roles.highest.position) {
            interaction.reply({ content:`I'm not high enough in the role hierarchy to do it.`, ephemeral: true });
            return;
        }
        if (interaction.member.roles.highest.position <= member.roles.highest.position) {
            interaction.reply({ content:`You aren't high enough in the role hierarchy to do that`, ephemeral: true });
            return;
        }

        let old_nick = await member.displayName;

        const embed = new MessageEmbed()
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setTitle(`Nickname Changed`)
            .setDescription(`Before: ${old_nick} \n After: ${nick}`)
            .setColor(member.displayHexColor)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        try {
            await member.setNickname(nick, reason)
        } catch (e) {
            interaction.reply({ content: `An error occured.`, ephemeral: true });
            return;
        }
        interaction.reply({ embeds: [embed] });
    },
};

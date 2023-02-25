const { Client, CommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "userinfo",
    description: "Check userinfo",
    options: [
        {
            name: 'user',
            description: 'The User you want to get info on',
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    permissions: [],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const member = interaction.options.getMember('user') || interaction.member;
        const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(' ').replace("@everyone", " ");

        const uiEmbed = new EmbedBuilder()
            .setAuthor({ name: `${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(member.user.displayAvatarURL({ format: 'jpg', size: 1024, dynamic: true }))
            .setDescription(`[Avatar](${member.user.displayAvatarURL({ format: 'jpg', size: 1024, dynamic: true })})`)
            .setColor(member.displayHexColor)
            .addField('Display Name', `${member.displayName}`, false)
            .addField('Username', `${member.user.tag}`, false)
            .addField('User ID', `${member.user.id}`, false)
            .addField("Server Member Since", `${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(member.joinedAt).startOf('day').fromNow()}`, true)
            .addField("Discord User Since", `${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(member.user.createdAt).startOf('day').fromNow()}`, true)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp();

        if (roles >= 1024) {
            uiEmbed.addField('Roles', `Reached Max Embed Length. *(Too many roles to display)*`, false)
        } else {
            uiEmbed.addField('Roles', `${roles}`, false)
        }

        interaction.reply({ embeds:[uiEmbed] });
    },
};

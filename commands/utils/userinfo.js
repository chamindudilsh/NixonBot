const { Message, Client, MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "userinfo",
    aliases: ['ui'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const Target = message.mentions.users.first() || message.author;
        const Member = message.guild.members.cache.get(Target.id);
        const dc_roles = Member.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(' ').replace("@everyone", " ");

        if (dc_roles.length >= 1024) {
            const uiEmbed2 = new MessageEmbed()
                .setAuthor(`${Target.username}`, Target.displayAvatarURL({ dynamic: true }))
                .setThumbnail(Target.displayAvatarURL({ format: 'jpg', size: 1024, dynamic: true }))
                .setDescription(`[Avatar](${Target.displayAvatarURL({ format: 'jpg', size: 1024, dynamic: true })})`)
                .setColor(Member.displayHexColor)
                .addField('Display Name', `${Member.displayName}`, false)
                .addField('Username', `${Target.tag}`, false)
                .addField('User ID', `${Target.id}`, false)
                .addField('Roles', `Reached Max Embed Length. *(Too many roles to display)*`, false)
                .addField("Server Member Since", `${moment(Member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(Member.joinedAt).startOf('day').fromNow()}`, true)
                .addField("Discord User Since", `${moment(Target.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(Target.createdAt).startOf('day').fromNow()}`, true)
                .setFooter(`${message.guild.name}`)
                .setTimestamp();
            
            message.channel.send({ embeds:[uiEmbed2] });
            return;
        }

        const uiEmbed = new MessageEmbed()
            .setAuthor(`${Target.username}`, Target.displayAvatarURL({ dynamic: true }))
            .setThumbnail(Target.displayAvatarURL({ format: 'jpg', size: 1024, dynamic: true }))
            .setDescription(`[Avatar](${Target.displayAvatarURL({ format: 'jpg', size: 1024, dynamic: true })})`)
            .setColor(Member.displayHexColor)
            .addField('Display Name', `${Member.displayName}`, false)
            .addField('Username', `${Target.tag}`, false)
            .addField('User ID', `${Target.id}`, false)
            .addField('Roles', `${dc_roles}`, false)
            .addField("Server Member Since", `${moment(Member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(Member.joinedAt).startOf('day').fromNow()}`, true)
            .addField("Discord User Since", `${moment(Target.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(Target.createdAt).startOf('day').fromNow()}`, true)
            .setFooter(`${message.guild.name}`)
            .setTimestamp();

        message.channel.send({ embeds:[uiEmbed] });
    },
};

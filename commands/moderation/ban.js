const { Message, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ban",
    aliases: [''],
    description: "Ban a User.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('BAN_MEMBERS')) return;
        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            message.reply({ content: `I'm missing Permissions: \`BAN MEMBERS\`` });
            return;
        }
        const member = message.mentions.members.first() || await message.guild.members.cache.get(args[0]);
        if (!member) {
            message.reply({ content:`Please Mention a user & try again.` });
            return;
        }
        if (message.guild.me.roles.highest.position <= member.roles.highest.position) {
            message.reply({ content:`I'm not high enough in the role hierarchy to do it.` });
            return;
        }
        if (message.member.roles.highest.position <= member.roles.highest.position) {
            message.reply({ content:`You aren't high enough in the role hierarchy to do that` });
            return;
        }

        const baseReason = args.slice(1).join(" ") || `No Reason Provided.`;
        let reason = `${baseReason} - ${message.author.tag}(${message.author.id})`;
        
        const banEmbed = new EmbedBuilder()
            .setTitle('Ban')
            .setColor('Red')
            .setDescription(`**Offender :** ${member.user.tag} ${member.toString()} \n**Reason :** ${reason} \n**Responsible Moderator :** ${message.author.tag}`)
            .setFooter({text: `ID: ${member.user.id}`})
            .setTimestamp();

        try {
            member.ban({ reason }).then(() => {
                message.channel.send({ embeds:[banEmbed] });
            })
        } catch (err) {
            console.error('Ban Member Error: ', err);
            message.reply('```An Error Occured!```');
            return;
        }
    },
};

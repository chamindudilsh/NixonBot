const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    aliases: [''],
    description: "Kick a User.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('KICK_MEMBERS')) return;
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            message.reply({ content:`\`\`\`\nPlease Mention a user & try again. \n Usage: \`.ban <@user> *<reason> (Optional)\`\`\`\`` });
            return;
        }
        const memberTarget = msg.guild.members.cache.get(member.id);
        if (message.guild.me.roles.highest.position <= memberTarget.roles.highest.position) {
            message.reply({ content:`I'm not high enough in the role hierarchy to do it.\n\`\`\`My top role is lower than that user's top role.\`\`\`` });
            return;
        }
        if (message.member.roles.highest.position <= memberTarget.roles.highest.position) {
            message.reply({ content:`You aren't high enough in the role hierarchy to kick ${member.tag}\n\`\`\`Your top role is same or lower than that user's top role.\`\`\`` });
            return;
        }

        const reason = args.slice(1).join(" ") || "No Reason Provided.";
        
        const kickEmbed = new MessageEmbed()
            .setTitle('Kick')
            .setColor('ORANGE')
            .setDescription(`**Offender :** ${member.tag} ${member} \n**Reason :** ${reason} \n**Responsible Moderator :** ${message.author.tag}`)
            .setFooter({text: `ID: ${member.id}`})
            .setTimestamp();

        try {
            member.kick({ reason }).then(() => {
                message.channel.send({ embeds:[banEmbed] });
            })
        } catch (err) {
            console.error('Kick Member Error: ', err);
            message.reply('```An Error Occured!```');
            return;
        }
    },
};

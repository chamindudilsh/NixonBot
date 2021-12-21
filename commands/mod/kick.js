const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('KICK_MEMBERS')) return;
        const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
        if (!args[0]) {
            message.reply({ content:`\`\`\`css\nSyntax: ${client.config.prefix}kick <member> [reason]\n\nmember is a required argument that is missing.\`\`\`` });
            return;
        }
        if (message.guild.me.roles.highest.position <= member.roles.highest.position) {
            message.reply({ content:`I'm not high enough in the role hierarchy to do it.\n\`\`\`My top role is lower than that user's top role.\`\`\`` });
            return;
        }
        if (message.member.roles.highest.position <= member.roles.highest.position) {
            message.reply({ content:`You aren't high enough in the role hierarchy to kick ${member.tag}\n\`\`\`Your top role is same or lower than that user's top role.\`\`\`` });
            return;
        }

        const reason = args.slice(1).join(" ") || "No Reason Provided.";
        
        const kickEmbed = new MessageEmbed()
            .setTitle('Kick')
            .setColor('ORANGE')
            .setDescription(`**Offender :** ${member.tag} ${member} \n**Reason :** ${reason} \n**Responsible Moderator :** ${message.author.tag}`)
            .setFooter(`ID: ${member.id}`)
            .setTimestamp();

        try {
            await member.send({ content:`You have been kicked from **${message.guild.name}**`, embeds:[kickEmbed] });
            member.kick({ reason: reason }).then(() => {
                message.channel.send({ embeds:[kickEmbed] });
            })
        } catch (err) {
            console.error('Kick Member Error: ', err);
            message.reply('```An Error Occured!```');
            return;
        }
    },
};

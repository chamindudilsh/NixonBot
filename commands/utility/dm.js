const { Message, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "dm",
    aliases: [''],
    description: "DM Users",
    cooldown: 10000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return;
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user;

        const dmEmbed = new EmbedBuilder()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTitle(`Message Sent`)
            .addField(`From`,`<@${message.author.id}>`, true)
            .addField(`To`, `<@${user.id}>`, true)
            .setFooter({ text: `Don't Abuse this too much` })
            .setTimestamp();

        if (message.content.includes("--a")) {
            const str = args.join(" ").replace("--a", "");

            user.send(str).then(() => {
                dmEmbed.addField(`Content`, `${str}`, false);
                message.channel.send({ embeds: [dmEmbed] });
            }).catch(() => {
                message.channel.send({ content: `Couldn't DM ${user.user.tag} \nLooks like ither their dms are off.` });
                return;
            })

        } else {
            user.send({ content: `${args.join(" ")} \n**-** Sent from \`${message.author.tag}\`` }).then(() => {
                dmEmbed.addField(`Content`, `${args.join(" ")}`, false);
                message.channel.send({ embeds: [dmEmbed] });
            }).catch(() => {
                message.channel.send({ content: `Couldn't DM ${user.user.tag} \nLooks like ither their dms are off.` });
            })
            
        }
    },
};

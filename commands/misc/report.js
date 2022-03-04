const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "report",
    aliases: [''],
    description: "Report users.",
    cooldown: 1800000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const reportChanel = client.channels.cache.get('947416928086016010');
        const reportedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!reportedUser) return message.reply({ content: `Please mention or Provid a User Id to Report.` });
        const report = args.slice(1).join(" ");
        if (!report) return message.reply({ content: `You must specify a reason to report.` });

        const reportEmbed = new MessageEmbed()
            .setTitle(`New Report`)
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .addField(`Reported User`, `<@${reportedUser.id}> (${reportedUser.id})`, true)
            .addField(`Reported By`, `<@${message.author.id}> (${message.author.id})`, true)
            .addField(`Report`, `${report}`, false)
            .addField(`Channel & Message`,`<#${message.channel.id}> [Message URL](${message.url})`)
            .setFooter({ text: `ID: ${message.author.id}` })
            .setTimestamp();

        reportChanel.send({ embeds: [reportEmbed] });
        message.reply({ content: `Successfully submitted your Report.` });
    },
};

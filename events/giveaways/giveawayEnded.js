const client = require("../../index");
const { EmbedBuilder } = require("discord.js");

client.giveawaysManager.on('giveawayEnded', (giveaway, winners) => {
    if (!winners.length) return;
    const guild = client.guilds.cache.get(giveaway.guildId);
    const host = guild.members.cache.get(giveaway.hostedBy);
    const winEmbed = new EmbedBuilder()
        .setTitle(`You won a Giveaway!`)
        .setColor('White')
        .setDescription(`<a:dg_yass:897011465893052438> You have won a giveaway for **${giveaway.prize}** in **${guild.name}** <a:dg_yass:897011465893052438> \n\nPlease wait patiently to receive your prize. Do not DM the host or ask for your payouts before 12 hours. Doing so will result in a reroll.\n`)
        .addField(`Giveaway Message`, `[${giveaway.prize}](${giveaway.messageURL})`, false)
        .setTimestamp();

    const hostEmbed = new EmbedBuilder()
        .setTitle(`Your Giveaway has Ended.`)
        .setURL(giveaway.messageURL)
        .setColor('Yellow')
        .setDescription(`You have ${winners.length} winner(s)\n ${winners.map(w => `${w} ID: ${w.user.id}`).join("\n")}`)
        .addField(`Giveaway Message`, `[${giveaway.prize}](${giveaway.messageURL})`, false)
        .setTimestamp();

    if (!guild.iconURL() || guild.iconURL() === undefined) {
        winEmbed.setFooter({ text: `${guild.name}` });
        hostEmbed.setFooter({ text: `${guild.name}` });

        winners.forEach((member) => {
            try {
                member.send({ embeds: [winEmbed] });
            } catch (err) {
                console.log(err);
            }
        });
        try {
            host.send({ embeds: [hostEmbed] });
        } catch (err) {
            console.log(err);
        }
        return;
    }

    winEmbed.setFooter({ text: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) });
    hostEmbed.setFooter({ text: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) });
    winners.forEach((member) => {
        try {
            member.send({ embeds: [winEmbed] });
        } catch (err) {
            console.log(err);
        }       
    });
    try {
        host.send({ embeds: [hostEmbed] });
    } catch (err) {
        console.log(err);
    }
});
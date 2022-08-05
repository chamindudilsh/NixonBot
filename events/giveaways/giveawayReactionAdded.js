const client = require('../../index');
const { EmbedBuilder } = require("discord.js");

client.giveawaysManager.on('giveawayReactionAdded', (giveaway, member, reaction) => {
    if (!giveaway.extraData || giveaway.extraData === null) return;

    if (!member.roles.cache.has(giveaway.extraData)) {
        reaction.users.remove(member.user);
        const role = member.guild.roles.cache.get(giveaway.extraData);

        const reqEmbed = new EmbedBuilder()
            .setTitle(`Missing Giveaway Requirement!`)
            .setColor('Red')
            .setDescription(`You are missing the \`${role.name}\` role required for this giveaway.\nYour entry has been removed.`)
            .addField(`Giveaway Message`, `[${giveaway.prize}](${giveaway.messageURL})`, false)
            .setTimestamp();

        if (!member.guild.iconURL() || member.guild.iconURL() === undefined) {
            reqEmbed.setFooter({ text: `${giveaway.guild.name}` });
            try {
                member.send({ embeds: [reqEmbed] });
            } catch (err) {
                console.log(err);
            }
            return;
        }

        reqEmbed.setFooter({ text: `${member.guild.name}`, iconURL: member.guild.iconURL({ dynamic: true }) });
        try {
            member.send({ embeds: [reqEmbed] });
        } catch (err) {
            console.log(err);
        }
    }
});
const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "servers",
    aliases: ['serverlist'],
    description: "List Servers",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.id !== client.config.owner) return;
        try {
            let i0 = 0;
            let i1 = 10;
            let page = 1;

            let description =
                `Total Servers - ${client.guilds.cache.size}\n\n` +
                client.guilds.cache
                    .sort((a, b) => b.memberCount - a.memberCount)
                    .map(
                        (r, i) =>
                            `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nServer ID - ${r.id}\nOwner - <@${r.owner.id}> (${r.owner.id})`
                    )
                    .slice(0, 10)
                    .join("\n\n");

            let embed = new MessageEmbed()
                .setTitle('Servers')
                .setColor('WHITE')
                .setDescription(description)
                .setFooter({ text: `Page - ${page}/${Math.ceil(client.guilds.cache.size / 10)}` });
            
            let msg = await message.channel.send({ embeds:[embed] });
            await msg.react("◀️");
            await msg.react("▶️");
            await msg.react("❌");

            const filter = (reaction, user) => user.id === client.config.owner;
            const collector = msg.createReactionCollector({ filter, time: 30_000 });

            collector.on('collect', (reaction) => {
                if (reaction.emoji.name === "◀️") {
                    i0 = i0 - 10;
                    i1 = i1 - 10;
                    page = page - 1;

                    if (i0 + 1 < 0) return;
                    description =
                    `Total Servers - ${client.guilds.cache.size}\n\n` +
                    client.guilds.cache
                        .sort((a, b) => b.memberCount - a.memberCount)
                        .map(
                            (r, i) =>
                                `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nServer ID - ${r.id}\nOwner - <@${r.owner.id}> (${r.owner.id})`
                        )
                        .slice(i0, i1)
                        .join("\n\n");

                    embed.setDescription(description);
                    embed.setFooter({ text: `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}` });

                    msg.edit({ embeds:[embed] });
                } else if (reaction.emoji.name === "▶️") {
                    i0 = i0 + 10;
                    i1 = i1 + 10;
                    page = page + 1;

                    if (i1 > client.guilds.cache.size + 10) return;
                    if (!i0 || !i1) return;
                    description =
                    `Total Servers - ${client.guilds.cache.size}\n\n` +
                    client.guilds.cache
                        .sort((a, b) => b.memberCount - a.memberCount)
                        .map(
                            (r, i) =>
                                `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nServer ID - ${r.id}\nOwner - <@${r.owner.id}> (${r.owner.id})`
                        )
                        .slice(i0, i1)
                        .join("\n\n");

                    embed.setDescription(description);
                    embed.setFooter({ text: `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}` });
        
                    msg.edit({ embeds:[embed] });
                } else if (reaction.emoji.name === "❌") return msg.delete();

                await reaction.users.remove(client.config.owner);
            });

            collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        } catch (e) {
            console.log(e);
            return;
        }
    },
};

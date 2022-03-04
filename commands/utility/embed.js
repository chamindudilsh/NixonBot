const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'embed',
    aliases: [''],
    description: "Send embeds",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let channel = message.mentions.channels.first() || message.channel;
        const filter = (m) => m.author.id === message.author.id;

        if (!channel) {
            return message.channel.send(
                new MessageEmbed()
                    .setDescription(`Please Mention a Channel to Send Embed`)
            )
        }

        let embed = new MessageEmbed();
        message.reply(
            new MessageEmbed()
                .setDescription(`> What is Tittle Of Embed ? || if not then type \`\`'none'\`\``)
        )
        .then(m => {setTimeout(() => {m.delete()}, 30000)});

        let title = await message.channel.awaitMessages(
            {
                filter,
                max: 1,
                time: 30000
            }
        );

        if (title.size) {
            if (title.first().content !== "none") {
                if (title.first().length > 256)
                    return message.reply(
                        new MessageEmbed()
                            .setDescription(`> Title Can not Biger Than 256 words`)
                    )
                    .then(m => {setTimeout(() => {m.delete()}, 5000)});
                embed.setTitle(title.first().content);
            }
        }

        message
            .reply(
                new MessageEmbed()
                    .setDescription(`> What is Description of Embed ? || if not then type \`\`'none'\`\``)
            )
            .then(m => {setTimeout(() => {m.delete()}, 30000)});
        let description = await message.channel.awaitMessages(
            {
                filter,
                max: 1,
                time: 30000
            }
        );

        if (description.size) {
            if (description.first().content !== "none") {
                if (description.first().length > 2048)
                    return message.reply(
                        new MessageEmbed()
                            .setDescription(`Description Can not Bigger than 2048 Words`)
                    )
                    .then(m => {setTimeout(() => {m.delete()}, 5000)});
                embed.setDescription(description.first().content);
            }
        }

        message
            .reply(
                new MessageEmbed()
                    .setDescription(`> What is Colour of Embed ? Please Put Hex Code of Colour || if not then type \`\`'none'\`\``)
            )
            .then(m => {setTimeout(() => {m.delete()}, 30000)});
        let color = await message.channel.awaitMessages(
            {
                filter,
                max: 1,
                time: 30000
            }
        );

        embed.setColor(color.first().content);

        message
            .reply(
                new MessageEmbed()
                    .setDescription(`> What is Footer of Embed ? || if not then type \`\`'none'\`\``)
            )
            .then(m => {setTimeout(() => {m.delete()}, 30000)});
        let footer = await message.channel.awaitMessages(
            {
                filter,
                max: 1,
                time: 30000
            }
        );

        if (footer.size) {
            if (footer.first().content !== "none") {
                if (footer.first().length > 100)
                    return message
                        .reply(
                            new MessageEmbed()
                                .setDescription(`> Footer can not Bigger Than 100 Words`)
                        )
                        .then(m => {setTimeout(() => {m.delete()}, 5000)});
                embed.setFooter({text: footer.first().content});
            }
        }

        // message.channel.send(embed);
        channel.send(embed)
        message.channel.send(
            new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`> Embed Sent to <#${channel.id}>`)
                .setFooter({text: message.guild.name})
        ).then(m => {setTimeout(() => {m.delete()}, 5000)});
    }
}
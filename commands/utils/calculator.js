const { Message, Client, MessageEmbed } = require("discord.js");
const math = require('mathjs');

module.exports = {
    name: "calculator",
    aliases: ['calc'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const query = args.join(" ");
        if (!query) {
            message.reply('Please provide arguments to calculate.');
            return;
        }

        try {
            const results = math.evaluate(query);
            const mathEmbed = new MessageEmbed()
                .setAuthor(`Calculation for ${query}`)
                .setTitle(`= ${results}`)
                .setColor('RANDOM')
                .setFooter(`say ${client.config.prefix}invite to Invite the Bot.`);

            message.channel.send({ content:`${results}`, embeds:[mathEmbed] })
        } catch (err) {
            message.reply('```An Error Occured!```\nPlease provid Valid arguments.');
            return;
        }
    },
};

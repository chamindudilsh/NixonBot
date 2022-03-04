const { Message, Client, MessageEmbed } = require("discord.js");
const math = require('mathjs');

module.exports = {
    name: "calculator",
    aliases: ['calc'],
    description: "Calculator, that's it",
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
        const results = math.evaluate(query);

        //if(isNaN(results)) return message.reply({ content: `Please provid valid arguments.` });

        try {
            const mathEmbed = new MessageEmbed()
                .setAuthor({ name: `Calculation for ${query}` })
                .setTitle(`= ${results.toLocaleString('en-US', {maximumFractionDigits:2})}`)
                .setFooter({ text: `Raw: ${results}` })
                .setColor('RANDOM');

            message.channel.send({ content:`${results}`, embeds:[mathEmbed] })
        } catch (err) {
            message.reply('```An Error Occured!```\nPlease provid Valid arguments.');
            return;
        }
    },
};

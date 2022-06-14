const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const math = require('mathjs');

module.exports = {
    name: "calculator",
    description: "Do maths easily",
    options: [
        {
            name: 'args',
            description: 'Arguments to calculate',
            type: 'STRING',
            required: true
        }
    ],
    permissions: [],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const query = interaction.options.getString('args');

        const mathEmbed = new MessageEmbed()
                .setAuthor({ name: `Calculation for ${query}` })
                .setColor('RANDOM');

        try {
            const results = math.evaluate(query);

            mathEmbed.setTitle(`= ${results.toLocaleString('en-US', {maximumFractionDigits:2})}`);
            mathEmbed.setFooter({ text: `Raw: ${results}` });

            interaction.reply({ content:`${results}`, embeds:[mathEmbed] })
        } catch (err) {
            interaction.reply({ content: 'An Error Occured!\nPlease provid Valid arguments.', ephemeral: true});
            return;
        }
    },
};

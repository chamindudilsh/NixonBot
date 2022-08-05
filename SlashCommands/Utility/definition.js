const { Client, CommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "definition",
    description: "Get Definitions from Urban Dictionary",
    options: [
        {
            name: 'text',
            description: 'Text to look up definition for',
            type: ApplicationCommandOptionType.String,
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
        let query = encodeURIComponent(interaction.options.getString('text'));
       
        const { 
            data: { list },
        } = await axios.get(
            `https://api.urbandictionary.com/v0/define?term=${query}`
        );
        const [ answer ] = list;

        if (!list.length) {
            interaction.reply({ content: `Couldn't find a Definition for \`${interaction.options.getString('text')}\``, ephemeral: true });
            return;
        }

        const udEmbed = new EmbedBuilder()
            .setAuthor({ name: `Requested By ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .setColor('Random')
            .addField("DEFINITION", trim(answer.definition), false)
            .addField("EXAMPLE", trim(answer.example) + '.', false)
            .addField("RATINGS", `${answer.thumbs_up} :thumbsup: || ${answer.thumbs_down} :thumbsdown:`)
            .setFooter({ text: 'These definitions are pulled from Urban Dictionary & may contain inappropriate words.' });

        interaction.reply({ embeds: [udEmbed] });
    },
};

function trim(input) {
    return input.length > 1024 ? `${input.slice(0, 1020)} ... ` : input;
}


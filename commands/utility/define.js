const { Message, Client, MessageEmbed } = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "define",
    aliases: ['ud'],
    description: "Definitions from Urban Dictionary",
    cooldown: 5000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let input = args.join(" ");
        if (!input) return message.reply({ content: `Please Provide a word to search Definition.` });
        let query = encodeURIComponent(input);

        const { 
            data: { list },
        } = await axios.get(
            `https://api.urbandictionary.com/v0/define?term=${query}`
        );
        const [ answer ] = list;

        if (!list.length) {
            message.reply({ content: `Couldn't find a Definition for \`${input}\`` });
            return;
        }

        const udEmbed = new MessageEmbed()
            .setAuthor({ name: `Requested By ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .setColor('RANDOM')
            .addField("DEFINITION", trim(answer.definition), false)
            .addField("EXAMPLE", trim(answer.example) + '.', false)
            .addField("RATINGS", `${answer.thumbs_up} :thumbsup: || ${answer.thumbs_down} :thumbsdown:`)
            .setFooter({ text: 'These definitions are pulled from Urban Dictionary & may contain inappropriate words.' });

        message.channel.send({ embeds: [udEmbed] });
    },
};

function trim(input) {
    return input.length > 1024 ? `${input.slice(0, 1020)} ... ` : input;
  }

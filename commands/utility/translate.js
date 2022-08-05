const { Message, Client, EmbedBuilder } = require("discord.js");
const translate = require('@iamtraction/google-translate');
const ISO6391 = require('iso-639-1');
const languageNames = new Intl.DisplayNames(['en'], {type: 'language'});

module.exports = {
    name: "translate",
    aliases: ['tr'],
    description: "Translate to English",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const query = args.join(" ");
        if (!query) return message.reply('Please provide some text to Translate.');

        const translated = await translate(query, { to: 'en' }).catch(console.error);
        const tr_embed = new EmbedBuilder()
            .setAuthor({ name :`Requested By ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setTitle('Translate')
            .setColor('Random')
            .addField(`Translation`, `${translated.text}`, false)
            .addField(`Original Text`, `${query}`, false)
            .addField(`Detected Language`, `${languageNames.of(translated.from.language.iso)}`, false)
            .setFooter({ text: 'These translations are pulled from Google Translate.'});

        if (translated.text.length >= 1024) {
            message.reply({ content: `The message is too long to Translate, try sending by parts.` });
            return;
        }

        try {
            message.channel.send({ embeds:[tr_embed] });
        } catch (err) {
        message.reply("```An Error Occured!```");
            return;
        } 
    },
};

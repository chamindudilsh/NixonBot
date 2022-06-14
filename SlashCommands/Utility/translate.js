const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const translate = require('@iamtraction/google-translate');
const ISO6391 = require('iso-639-1');
const languageNames = new Intl.DisplayNames(['en'], {type: 'language'});

module.exports = {
    name: "translate",
    description: "Translate texts",
    options: [
        {
            name: 'text',
            description: 'Text to translate',
            type: 'STRING',
            required: true
        },
        {
            name: 'language',
            description: 'The language to Translate to, leave out for English',
            type: 'STRING',
            required: false
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
        const query = interaction.options.getString('text');
        const langCode = ISO6391.getCode(interaction.options.getString('language') || 'English');

        if (!ISO6391.validate(langCode)) {
            return interaction.reply({ content: `Please enter a valid Language`, ephemeral: true });
        }

        const translated = await translate(query, { to: langCode }).catch((e) => {
            console.log(e);
            return interaction.reply({ content: `An error occured!`, ephemeral: true });
        });

        const tr_embed = new MessageEmbed()
            .setAuthor({ name :`Requested By ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setTitle('Translate')
            .setColor('RANDOM')
            .addField(`Translation`, `${translated.text}`, false)
            .addField(`Original Text`, `${query}`, false)
            .addField(`Detected Language`, `${languageNames.of(translated.from.language.iso)}`, true)
            .addField(`Translated to`,`${languageNames.of(langCode)}`, true)
            .setFooter({ text: 'These translations are pulled from Google Translate.'});

        if (translated.text.length >= 1024) {
            interaction.reply({ content: `The message is too long to Translate, try sending by parts.` });
            return;
        }

        try {
            interaction.reply({ embeds:[tr_embed] });
        } catch (err) {
            interaction.reply({ content: "An Error Occured!", ephemeral: true });
            return;
        } 

    },
};

const { Message, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "decode",
    aliases: [''],
    description: "Decode encoded text",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const format = args[0];
        if (!format) return message.reply({ content: `You must specify a format to Decode from.` });
        const supported = ["ascii", "base64", "base64url", "binary", "hex", "latin1", "ucs-2", "utf-8", "utf16le", "utf8"];
        if (!supported.includes(format)) {
            message.reply({ content: `Please specify a valid format.\n*Supported Types:* \`${supported.map((ss) => ss).join("`, `")}\`` });
            return;
        }
        const query = args.slice(1).join(" ");
        if (!query) return message.reply({ content: `Please provide some text to Decode.` });
        let buff = Buffer.from(query, format);
        let output = buff.toString();

        const baseEmbed = new EmbedBuilder()
            .setTitle(`Decoder`)
            .setColor('Random')
            .addField(`${formatString(format)}`, `\`\`\`${query}\`\`\``, false)
            .addField(`Text`, `\`\`\`${output}\`\`\``, false)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        message.channel.send({ embeds: [baseEmbed] });        
    },
};

const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

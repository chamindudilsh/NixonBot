const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "encode",
    aliases: [''],
    description: "Encode text.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const format = args[0];
        if (!format) return message.reply({ content: `You must specify a format to Encode.` });
        const supported = ["ascii", "base64", "base64url", "binary", "hex", "latin1", "ucs-2", "utf-8", "utf16le", "utf8"];
        if (!supported.includes(format)) {
            message.reply({ content: `Please Provide a valid format.\n*Supported Types: \`${supported.map((ss) => ss).join("`, `")}\`` });
            return;
        }
        const query = args.slice(1).join(" ");
        if (!query) return message.reply({ content: `Please provide some text to Encode.` });
        let buff = Buffer.from(query);
        let output = buff.toString(format);

        const baseEmbed = new MessageEmbed()
            .setTitle(`Encoder`)
            .setColor('RANDOM')
            .addField(`Text`, `\`\`\`${query}\`\`\``, false)
            .addField(`${formatString(format)}`, `\`\`\`${output}\`\`\``, false)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        message.channel.send({ embeds: [baseEmbed] });     
    },
};

const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
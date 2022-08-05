const { Message, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "8ball",
    aliases: ['8b'],
    description: "Ask questions from 8 Ball",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply({ content: `Please ask a question.` });
        const question = args.join(" ");
        const replies = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.",
        "Don’t count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.",
        "Outlook not so good.", "Outlook good.", "Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt.",
        "Yes.", "Yes! definitely.", "You may rely on it."];

        let result = Math.floor((Math.random() * replies.length));

        const ballEmbed = new EmbedBuilder()
            .setTitle(`🎱8 Ball`)
            .setColor('Random')
            .addField(`Asked`, `\`\`\`${question}\`\`\``, false)
            .addField(`Answer`, `\`\`\`${replies[result]}\`\`\``, false)
            .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` });

        message.channel.send({ embeds: [ballEmbed] });
    }, 
};

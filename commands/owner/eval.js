const { Message, Client, MessageEmbed } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { inspect } = require('util');
const functions = require('../../utils/functions');
const ms = require('ms');

module.exports = {
    name: "eval",
    aliases: [''],
    description: "Evaluate JS Code",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.id !== client.config.owner) return;

        const code = args.join(" ");
        if (!code) {
            message.reply({ content: "Please provide some code to evaluate." });
            return;
        }

        const EvalEmbed = new MessageEmbed()
            .addField(`Input`, `\`\`\`js\n${code}\`\`\``, false)
            
        try {
            const result = await eval(code);
            let output = result;
            if (typeof result !== 'string') {
                output = inspect(result);
            }
            if (output.includes(client.config.token)) {
                output = output.replace(client.config.token, "T0K3N H1DD3N");
            }

            if (output.length >= 1024) {
                EvalEmbed.addField(`Output`, `\`\`\`Output is too long to send in a embed. Sending as Raw messages...\`\`\``, false);
                await message.channel.send({ embeds: [EvalEmbed] });
                message.channel.send(codeBlock(output.slice(0, 2000)));
                return;
            }

            EvalEmbed.addField(`Output`, `\`\`\`js\n${output}\`\`\``, false);

            message.channel.send({ embeds: [EvalEmbed] });
        } catch (err) {
            err = err.toString();
            if (err.includes(client.config.token)) {
                err = err.replace(client.config.token, "T0K3N H1DD3N");
            }
            EvalEmbed.addField(`Error`, `\`\`\`js\n${err}\`\`\``, false);

            message.channel.send({ embeds: [EvalEmbed] });
            return;
        }
    },
};

const { Client, CommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { inspect } = require('util');
const functions = require('../../utils/functions');
const ms = require('ms');

module.exports = {
    name: "eval",
    description: "Evaluate JS Code",
    options: [
        {
            name: 'code',
            description: 'Code to Evaluate',
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
        if (interaction.user.id !== client.config.owner) {
            interaction.reply({ content: 'This spell is too powerful for you.', ephemeral: true });
            return;
        }

        const code = interaction.options.getString('code');
        const EvalEmbed = new EmbedBuilder()
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
                await interaction.reply({ embeds: [EvalEmbed] });
                interaction.channel.send(codeBlock(output.slice(0, 2000)));
                return;
            }

            EvalEmbed.addField(`Output`, `\`\`\`js\n${output}\`\`\``, false);

            interaction.reply({ embeds: [EvalEmbed] });
        } catch (err) {
            err = err.toString();
            if (err.includes(client.config.token)) {
                err = err.replace(client.config.token, "T0K3N H1DD3N");
            }
            EvalEmbed.addField(`Error`, `\`\`\`js\n${err}\`\`\``, false);

            interaction.reply({ embeds: [EvalEmbed] });
            return;
        }      
    },
};

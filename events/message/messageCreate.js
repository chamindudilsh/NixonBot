const client = require("../../index");
const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    if (message.content === client.config.prefix) return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    if (command.cooldown) {
        if (client.Cooldown.has(`${command.name}_${message.author.id}`)) {
            const cdEmbed = new EmbedBuilder()
                .setTitle(`Little too fast there`)
                .setDescription(`You have to wait **${ms(client.Cooldown.get(`${command.name}_${message.author.id}`) - Date.now(), {long: true})}** before using this command again!`)
                .setFooter({ text: client.user.username });

            message.reply({ embeds: [cdEmbed] });
            return;
        }
        await command.run(client, message, args);
        client.Cooldown.set(`${command.name}_${message.author.id}`, Date.now() + command.cooldown);
        setTimeout(() => {
            client.Cooldown.delete(`${command.name}_${message.author.id}`);
        }, command.cooldown);
        return;
    }
    await command.run(client, message, args);
});

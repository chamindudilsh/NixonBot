const { MessageEmbed } = require('discord.js');
const client = require("../index");

client.on("messageCreate", async (message) => {
  
    if (message.content === `<@${client.user.id}>`) {
        const pingEmbed = new MessageEmbed()
            .setTitle(`${client.user.username}`)
            .setColor('DARK_BLUE')
            .setDescription(`Use \`${client.config.prefix}help\` for get some help.\nServer Perfixes:\n \`${client.config.prefix}\`, <@${client.user.id}>\n`);
            
        message.channel.send({ embeds:[pingEmbed] });
    }   
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});

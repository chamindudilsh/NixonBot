const { Message, Client, EmbedBuilder } = require("discord.js");
const child = require('child_process');

module.exports = {
    name: "terminate",
    aliases: [''],
    description: "Terminate the bot",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.id !== client.config.owner) return;

        const confirmEmbed = new EmbedBuilder()
            .setTitle('Are you sure about Terminating?')
            .setColor('Orange')
            .setDescription(`If yes, send **CONFIRM**\nIf no, send **Cancel**\n\nYou have 20 seconds to decide.`)
            .setFooter({ text: 'Caps Counts' })

        let Embedreply = await message.reply({ embeds: [confirmEmbed] });

        const filter = (m) => m.author.id === message.author.id;
        let confirmation = await message.channel.awaitMessages(
            {
                filter,
                max: 1,
                time: 20000
            }
        );

        if (confirmation.size) {
            if (confirmation.first().content === 'CONFIRM') {
                const killedEmbed = new EmbedBuilder()
                    .setTitle('Action Confirmed')
                    .setColor('Red')
                    .setDescription(`${client.user.username} is going Offline within few seconds.`)
                    .setFooter({ text: 'Bye Bye'})

                await message.channel.send({ embeds: [killedEmbed] });
                await client.destroy();
                console.log("Logging Out, Shutting Down.");
                //process.exit();
                child.exec('process.exit()', (err, res) =>{
                    if(err) return message.reply({ content: `Couldn't Terminate the bot.` })
                })
            } else if (confirmation.first().content.toLowerCase() === 'cancel') {
                const aliveEmbed = new EmbedBuilder()
                    .setTitle('Action Cancelled')
                    .setColor('Green')
                    .setDescription(`Thank you Master, for letting me live.`)
                    .setFooter({ text: 'guess I\'ll be around' })

                message.channel.send({ embeds: [aliveEmbed] });
                return;
            }
        }

        const timeoutEmbed = new EmbedBuilder()
            .setTitle('Operation Timed out.')
            .setColor('DARK_AQUA')
            .setDescription(`If yes, send **CONFIRM**\nIf no, send **Cancel**\n\nYou have 20 seconds to decide.`)
            .setFooter({ text: 'Caps Counts' })

        setTimeout(() => {
            message.channel.send({ content: `Confirmation Timed out.` });
            Embedreply.edit({ embeds: [timeoutEmbed] });
        }, 20000);
    },
};

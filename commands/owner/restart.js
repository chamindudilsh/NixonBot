const { Message, Client, EmbedBuilder } = require("discord.js");
const child = require('child_process');

module.exports = {
    name: "restart",
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
            .setTitle('Are you sure about Restarting?')
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
                const restartEmbed = new EmbedBuilder()
                    .setTitle('Action Confirmed')
                    .setColor('Green')
                    .setDescription(`${client.user.username} is Restarting within few seconds.`)
                    .setFooter({ text: 'See ya in few secs'})

                await message.channel.send({ embeds: [restartEmbed] });
                await client.destroy();
                console.log("Logging Out, Restarting");
                //process.exit();
                child.exec('npx pm2 restart index.js', (err, res) =>{
                    if(err) return message.reply({ content: `Couldn't Terminate the bot.` })
                })
            } else if (confirmation.first().content.toLowerCase() === 'cancel') {
                const aliveEmbed = new EmbedBuilder()
                    .setTitle('Action Cancelled')
                    .setColor('Red')
                    .setDescription(`OK i guess, Nothing bad would happen tho.`)
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

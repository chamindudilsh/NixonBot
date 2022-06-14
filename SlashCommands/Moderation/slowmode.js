const { Client, CommandInteraction, Permissions } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "slowmode",
    description: "Manage Slowmode of a channel",
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'set',
            description: 'Set Slowmode for a channel',
            options: [
                {
                    name: 'time',
                    description: 'The duration of slowmode',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'channel',
                    description: 'The channel to remove slowmode',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT'],
                    required: false
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'remove',
            description: 'Remove the slowmode from a channel',
            options: [
                {
                    name: 'channel',
                    description: 'The channel to remove slowmode',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT'],
                    required: false
                }
            ]
        }
    ],
    permissions: [ Permissions.FLAGS.MANAGE_CHANNELS ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild.me.permissions.has('MANAGE_CHANNELS')) {
            interaction.reply({ content: `I'm missing Permissions: \`MANAGE CHANNELS\``, ephemeral: true });
            return;
        }
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        if (args[0] === 'set') {
            const timeInMs = ms(interaction.options.getString('time'));           
    
            if (!timeInMs) {
                interaction.reply({ content: 'Please specify a vaild time!', ephemeral: true });
                return;
            }
            if (timeInMs < 1000 || timeInMs > 21600000) {
                return interaction.reply({ content: `Duration must be within the *1 second - 6 hours* range.`, ephemeral: true })
            }
    
            try {
                channel.setRateLimitPerUser(timeInMs / 1000);
            } catch (e) {
                interaction.reply({ content: `An error occured!`, ephemeral: true })
                console.log(e);
                return;
            }
            interaction.reply({ content: `The slowmode for this channel has been set to ${ms(timeInMs, { long: true })}` });
        } else if (args[0] === 'remove') {
            try {
                channel.setRateLimitPerUser(0);
            } catch (e) {
                interaction.reply({ content: `An error occured!`, ephemeral: true })
                console.log(e);
                return;
            }
            
            interaction.reply({ content: `The Slowmode has removed.` });
        }      
    },
};

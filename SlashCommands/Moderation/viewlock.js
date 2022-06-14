const { Client, CommandInteraction, Permissions } = require("discord.js");

module.exports = {
    name: "viewlock",
    description: "Viewlock & Unviewlock channels from members",
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'set',
            description: 'Set Viewlock',
            options: [
                {
                    name: 'role',
                    description: 'The specified Role to viewlock',
                    type: 'ROLE',
                    required: false
                },
                {
                    name: 'channel',
                    description: 'The channel to viewlock',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT'],
                    required: false
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'remove',
            description: 'Remove Viewlock',
            options: [
                {
                    name: 'role',
                    description: 'The specified Role to remove viewlock',
                    type: 'ROLE',
                    required: false
                },
                {
                    name: 'channel',
                    description: 'The channel to remove viewlock',
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
        
        let channel = interaction.options.getChannel('channel') || interaction.channel;
        let role = interaction.options.getRole('role');

        if (args[0] === 'set') {
            if (!role) {
                channel.permissionOverwrites.edit(interaction.guild.id,{ 'VIEW_CHANNEL': false });
                interaction.reply({ content: `Viewlocked **#${channel.name}** for \`@everyone\`` });
                return;
            }      
    
            channel.permissionOverwrites.edit(role.id,{ 'VIEW_CHANNEL': false });
            interaction.reply({ content: `Viewlocked **#${channel.name}** for \`${role.name}\`` });

        } else if (args[0] === 'remove') {
            if (!role) {
                channel.permissionOverwrites.edit(interaction.guild.id,{ 'VIEW_CHANNEL': null });
                interaction.reply({ content: `Removed Viewlock in **#${channel.name}** for \`@everyone\`` });
                return;
            }      
    
            channel.permissionOverwrites.edit(role.id,{ 'VIEW_CHANNEL': null });
            interaction.reply({ content: `Removed Viewlock in **#${channel.name}** for \`${role.name}\`` });
        }
       
    },
};

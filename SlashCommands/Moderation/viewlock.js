const { Client, CommandInteraction, ApplicationCommandOptionType, PermissionsBitField, ChannelType } = require("discord.js");

module.exports = {
    name: "viewlock",
    description: "Viewlock & Unviewlock channels from members",
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'set',
            description: 'Set Viewlock',
            options: [
                {
                    name: 'role',
                    description: 'The specified Role to viewlock',
                    type: ApplicationCommandOptionType.Role,
                    required: false
                },
                {
                    name: 'channel',
                    description: 'The channel to viewlock',
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: false
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'remove',
            description: 'Remove Viewlock',
            options: [
                {
                    name: 'role',
                    description: 'The specified Role to remove viewlock',
                    type: ApplicationCommandOptionType.Role,
                    required: false
                },
                {
                    name: 'channel',
                    description: 'The channel to remove viewlock',
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: false
                }
            ]
        }        
    ],
    permissions: [ PermissionsBitField.Flags.ManageChannels ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild.members.me.permissions.has('ManageChannels')) {
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

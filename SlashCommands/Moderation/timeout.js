const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "timeout",
    description: "Timeout a User",
    options: [
        {
            name: 'user',
            description: 'The User you want to perform the timeout on',
            type: 'USER',
            required: true
        },
        {
            name: 'length',
            description: 'The duration of the timeout',
            type: 'STRING',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the timeout',
            type: 'STRING',
            required: true
        }
    ],
    permissions: [ Permissions.FLAGS.MODERATE_MEMBERS ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild.me.permissions.has('MODERATE_MEMBERS')) {
            interaction.reply({ content: `I'm missing Permissions: \`TIMEOUT MEMBERS\``, ephemeral: true });
            return;
        }
        const user = interaction.options.getUser('user');
        const length = interaction.options.getString('length');
        const reason = interaction.options.getString('reason');
        const member = interaction.guild.members.cache.get(user.id);
        const timeInMs = ms(length);

        if (!timeInMs) {
            interaction.reply({ content: 'Please specify a vaild time!', ephemeral: true });
            return;
        }

        if (member.permissions.has('ADMINISTRATOR')) {
            interaction.reply({ content: "I can't timeout an Administrator", ephemeral: true });
            return;
        }

        await member.timeout(timeInMs, reason);

        const timeoutEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('Timeout')
            .setDescription(`${member} has been timed out for ${ms(length,{ long:true })}\n**Reason:** ${reason}\n**Responsible Moderator:** ${interaction.user.tag}`)
            .setTimestamp();

        interaction.reply({ embeds: [timeoutEmbed] });
    },
};

const { Client, CommandInteraction, Permissions } = require("discord.js");

module.exports = {
    name: "unban",
    description: "Unban a banned user",
    options: [
        {
            name: 'user',
            description: 'The User ID to unban',
            type: 'STRING',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the unban',
            type: 'STRING',
            required: false
        }
    ],
    permissions: [ Permissions.FLAGS.BAN_MEMBERS ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild.me.permissions.has('BAN_MEMBERS')) {
            interaction.reply({ content: `I'm missing Permissions: \`BAN MEMBERS\``, ephemeral: true });
            return;
        }
        const userID = interaction.options.getString('user');
        const baseReason = interaction.options.getString('reason') || `No Reason Provided.`;
        let reason = `${baseReason} - ${interaction.user.tag}(${interaction.user.id})`;

        if (isNaN(userID)) {
            return interaction.reply({ content: `Please provide a valid User ID`, ephemeral: true });
        }

        await interaction.guild.bans.fetch(userID).catch((e) => {
            interaction.reply({ content: `It seems like that user isn't Banned.`, ephemeral: true });
            console.log(e);
            return;
        });       

        try {
            var unbannedUser = interaction.guild.bans.remove(userID, reason);            
        } catch (e) {
            interaction.reply({ content: `Something went wrong.`, ephemeral: true });
            return;
        }
        interaction.reply({ content: `Unbanned **${(await unbannedUser).tag}**` });
    },
};

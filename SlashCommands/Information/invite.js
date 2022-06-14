const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Invite & Support",
    type: 'CHAT_INPUT',
    permissions: [],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const inviteEmbed = new MessageEmbed()
            .setTitle('Invite & Support')
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription(`**Hi** ${interaction.user.username}, Thanks for choosing me & thinking of inviting me to your server.\nUse the following buttons or the links to Add me to your server. \n\n[Invite](https://discord.com/api/oauth2/authorize?client_id=920318627754938418&permissions=8&scope=bot%20applications.commands)\n[Support](https://discord.gg/vfexaskEBA)`)
            .setFooter({ text: 'You can also invite the bot right from the profile' });

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Invite')
                    .setStyle('LINK')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=920318627754938418&permissions=8&scope=bot%20applications.commands'),

                new MessageButton()
                    .setLabel('Support')
                    .setStyle('LINK')
                    .setURL('https://discord.gg/K5qA3xV53w')
            );

        interaction.reply({ embeds: [inviteEmbed], components: [row] });
    },
};

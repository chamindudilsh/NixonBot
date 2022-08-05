const { Message, Client, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "invite",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const inviteEmbed = new EmbedBuilder()
            .setTitle('Invite')
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setColor('LuminousVividPink')
            .setDescription(`**Hi** ${message.author.username}, Thanks for choosing me & thinking of inviting me to your server.\nUse the following buttons or the links to Add me to your server. \n\n[Invite](https://discord.com/api/oauth2/authorize?client_id=920318627754938418&permissions=8&scope=bot%20applications.commands)\n[Support](https://discord.gg/vfexaskEBA)`)
            .setFooter('You can also invite the bot right from the profile, if you\'re using a PC.');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Invite')
                    .setStyle('LINK')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=920318627754938418&permissions=8&scope=bot%20applications.commands'),

                new ButtonBuilder()
                    .setLabel('Support')
                    .setStyle('LINK')
                    .setURL('https://discord.gg/K5qA3xV53w')
            );

        message.channel.send({ embeds: [inviteEmbed], components: [row] });
    },
};

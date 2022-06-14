const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "now-playing",
    description: "Now Playing Track",
    type: 'CHAT_INPUT',
    permissions: [],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) {
            return interaction.reply({ content: `There's no Music playing at the moment.`, ephemeral: true });
        }
        await interaction.deferReply();
        
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        const Embed = new MessageEmbed()
            .setTitle(`<a:playing:986126798343532594> Now Playing`)
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription(`**${queue.current.title}** (${queue.current.duration})\n(\`${perc.progress == 'Infinity' ? 'Live' : perc.progress + '%'}\`)`)
            .addField(`\u200b`, `${progress.replace(/ 0:00/g, ' ◉ LIVE')}`, false)
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTimestamp();

        interaction.followUp({ embeds: [Embed] });
    },
};

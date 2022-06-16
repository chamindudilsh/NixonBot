const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "skip",
    description: "Skip current playing song.",
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
        const currentTrack = queue.current.title;
        const success = queue.skip();

        interaction.reply({ content: success ? `Skipped **${currentTrack}**` : 'Something went wrong!' })
    },
};

const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "pause",
    description: "Pause currently playing track",
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

        const paused = queue.setPaused(true);
        interaction.reply({ content: paused ? 'Paused the player!' : 'Something went wrong!' });       
    },
};

const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "resume",
    description: "Resume the paused track",
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
            return interaction.reply({ content: `Could not find a paused queue`, ephemeral: true });
        }

        const paused = queue.setPaused(false);
        interaction.reply({ content: paused ? 'Resumed the queue!' : 'Something went wrong!' });   
    },
};

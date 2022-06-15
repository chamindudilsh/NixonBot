const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "stop",
    description: "Stop playing Music & leave VC",
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

        queue.destroy();
        interaction.reply({ content: `Stopped playing Music!` });
    },
};

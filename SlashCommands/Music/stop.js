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
        if (!interaction.member.voice.channe) {
            return interaction.reply({ content: `Please join a VC to use this command.`, ephemeral: true });
        }

        if (!interaction.member.voice.channel.id === interaction.guild.me.voice.channel.id) {
            return interaction.reply({ content: `You either need to be in the Same VC as bot to use this command.`, ephemeral: true });
        }

        queue.destroy();
        interaction.reply({ content: `Stopped playing Music!` });
    },
};

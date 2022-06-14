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

        if (!queue) {
            return interaction.reply({ content: `Could not find a paused queue`, ephemeral: true });
        }
        if (queue.playing) {
            return interaction.reply({ content: `I'm currently playing Music, nothing to resume.`, ephemeral: true });
        }
        if (!interaction.member.voice.channe) {
            return interaction.reply({ content: `Please join a VC to use this command.`, ephemeral: true });
        }
        if (!interaction.member.voice.channel.id === interaction.guild.me.voice.channel.id) {
            return interaction.reply({ content: `You either need to be in the Same VC as bot to use this command.`, ephemeral: true });
        } 

        const paused = queue.setPaused(false);
        interaction.reply({ content: paused ? 'Resumed the queue!' : 'Something went wrong!' });   
    },
};

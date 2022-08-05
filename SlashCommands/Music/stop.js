const { Client, CommandInteraction, ApplicationCommandType } = require("discord.js");

module.exports = {
    name: "stop",
    description: "Stop playing Music & leave VC",
    type: ApplicationCommandType.ChatInput,
    permissions: [],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
       const queue = client.player.getQueue(interaction.guild.id);

        if (!interaction.member.voice.channel) {
            return interaction.reply({ content: "<:warn:986127753990529065> You must join a Voice Channel to use this command.", ephemeral: true });
        }
        if (!queue) {
            return interaction.reply({ content: `There's no Music playing at the moment.`, ephemeral: true });
        }        
        if (interaction.member.voice.channel.id !== queue.connection.channel.id) {
            return interaction.reply({ content: `You need to be in the same VC as me to use this command.`, ephemeral: true });
        }

        queue.destroy();
        interaction.reply({ content: `Stopped playing Music!` });
    },
};

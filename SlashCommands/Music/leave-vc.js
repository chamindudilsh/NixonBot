const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "leave-vc",
    description: "Leave the Voice Channel Bot's in",
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
        const Vconnection = queue.connection;
        if (!Vconnection) {
            return interaction.reply({ content: "<:warn:986127753990529065> Bot isn't in any Voice Channel.", ephemeral: true });
        }
        
        
        try {
            await queue.destroy();
        } catch (e) {
            console.log(e);
            interaction.reply({ content:`An Error Occured!`, ephemeral: true });
            return;
        }
        
        interaction.reply({ content:`Successfully disconnected from <#${Vconnection.channel.id}>` });
    },
};

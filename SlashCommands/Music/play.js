const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "play",
    description: "Play Music in a voice channel",
    options: [
        {
            name: 'song',
            description: 'Song Name to play',
            type: 'STRING',
            required: true
        }
    ],
    permissions: [],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const query = interaction.options.getString('song');
        const queue = client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });

        if (interaction.guild.me.voice.channel) {
            return interaction.reply({ content: `I'm already playing Music in <#${interaction.guild.me.voice.channel.id}>`, ephemeral: true });
        }

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return interaction.reply({ content: "<:warn:986127753990529065> You must join a Voice Channel first.", ephemeral: true });
        }

        await interaction.deferReply();
        const track = await client.player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return interaction.followUp({ content: `<:warn:986127753990529065> **${query}** not found!`, ephemeral: true });

        queue.play(track);

        return interaction.followUp({ content: `Loading: **${track.title}**`, ephemeral: true });
    },
};

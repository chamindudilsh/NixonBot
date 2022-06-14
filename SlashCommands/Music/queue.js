const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Manage the Queue",
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'list',
            description: 'List the Queue',
            options: [
                {
                    name: 'page',
                    type: 'INTEGER',
                    description: 'Specific page number in queue',
                    required: false
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'clear',
            description: 'Clear the Queue',
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
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            return interaction.reply({ content: `Could not find a queue`, ephemeral: true });
        }

        if (args[0] === 'list') {
            const page = interaction.options.getInteger('page') || 1;
            const pageStart = 10 * (page - 1);
            const pageEnd = pageStart + 10;
            const currentTrack = queue.current;
            const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
                return `${i + pageStart + 1}. **${m.title}** ([Link](${m.url}))`;
            });

            const Embed = new MessageEmbed()
                .setTitle('Server Queue')
                .setColor('LUMINOUS_VIVID_PINK')
                .setDescription(`${tracks.join('\n')}${
                    queue.tracks.length > pageEnd
                        ? `\n...${queue.tracks.length - pageEnd} more track(s)`
                        : ''
                }`)
                .addField(`Now Playing`, `${currentTrack.title}\n([Link](${currentTrack.url}))`, false)
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();

            interaction.reply({ embeds:[Embed] });

        } else if (args[0] === 'clear') {
            queue.clear();

            interaction.reply({ content: `Cleared the Queue!` });
        }        
    },
};

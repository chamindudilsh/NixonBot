const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "purge",
    description: "Delete multiple messages at once",
    options: [
        {
            name: 'amount',
            description: 'The amount of messages to delete',
            type: 'NUMBER',
            required: true
        },
        {
            name: 'target',
            description: 'Specified Target (Optional)',
            type: 'USER',
            required: false
        }
    ],
    permissions: [ Permissions.FLAGS.MANAGE_MESSAGES ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild.me.permissions.has('MANAGE_MESSAGES')) {
            interaction.reply({ content: `I'm missing Permissions: \`MANAGE MESSAGES\``, ephemeral: true });
            return;
        }

        let amount = interaction.options.getNumber('amount');
        let target = interaction.options.getMember('target');

        if (amount > 99) return interaction.reply({ content: 'You Can\'t delete more than 99 messages at one time.', ephemeral: true});
        if (amount < 1) return interaction.reply({ content: 'You must delete at least 1 message.', ephemeral: true});
        
        const Response = new MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK');

        if (target) {
            let i = 0;
            const filtered = [];
            const Messages = await interaction.channel.messages.fetch();
            (await Messages).filter((m) => {
                if (m.author.id === target.user.id && amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await interaction.channel.bulkDelete(filtered, true).then((messages) => {
              Response.setDescription(`Cleared ${messages.size} messages from ${target.toString()}`);
            }).catch((err) => console.error('Clear messages with user error: ', err));

            interaction.reply({ embeds:[Response], ephemeral: true });

        } else {
            await interaction.channel.messages.fetch({ limit: amount }).then((messages) => {
                interaction.channel.bulkDelete(messages);   
                Response.setDescription(`Cleared ${messages.size} messages from this channel.`);            
            }).catch((err) => console.error('Clear message without user error: ', err));
           
            interaction.reply({ embeds:[Response], ephemeral: true });
        }
    },
};

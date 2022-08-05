const { Client, CommandInteraction, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "Get Help for Using Nixon",
    type: ApplicationCommandType.ChatInput,
    permissions: [],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const categories = [
            'Moderation',
            'Utility',
            'Giveaways',
            'Misc',
            'Fun',
            'Image'
        ]
        const emojis = {
            Moderation: '🔨',
            Utility: '🛠',
            Giveaways: '🎁',
            Misc: '🎗',
            Fun: '🎈',
            Image: '📷'           
        }

        const InitEmbed = new EmbedBuilder()
            .setColor('DARK_AQUA')
            .setDescription(`Please choose a category in the dropdown menu.`);

        const components = (state) => [
            new ActionRowBuilder().addComponents(
                new SelectMenuBuilder()
                    .setCustomId('help-menu')
                    .setPlaceholder("Please select a category")
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cate) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from ${cate} category`,
                                emoji: emojis[categories] || null,
                            };
                        })
                    )
            ),
        ];

        const initialMessage = await interaction.channel.send({
            embeds: [InitEmbed],
            components: components(false),
        });

        const filter = (MenuInteraction) => MenuInteraction.user.id === interaction.user.id;

        const collecter = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: "SELECT_MENU",
            time: 120000,
        });

        collecter.on('collect', (MenuInteraction) => {
            const [ directory ] = MenuInteraction.values;
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory
            );

            const categoryEmbed = new EmbedBuilder()
                .setTitle(`${formatString(directory)} commands`)
                .setDescription("Here are the list of commands")
                .setColor('LuminousVividPink')
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: `${cmd.description}`,
                            inline: true,
                        }
                    })
                );

            MenuInteraction.update({ embeds: [categoryEmbed] });
        });

        collecter.on('end', () => {
            initialMessage.edit({ components: components(true) });
        });
    },
};

const { 
    Message, Client, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, Interaction 
} = require("discord.js");

module.exports = {
    name: "help",
    aliases: [''],
    description: "Help Menu of the bot.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const emojis = {
            information: 'ℹ',
            moderation: '🔨',
            utility: '🛠',
            misc: '🎗',
            fun: '🎈',
            image: '📷',
            giveaways: '🎁',
            owner: '🔰',
        }
        const directories = [
            ...new Set(client.commands.map((cmd) => cmd.directory)),
        ];

        const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommands = client.commands
                .filter((cmd) => cmd.directory === dir)
                .map((cmd) => {
                    return {
                        name: cmd.name || "There's no name",
                        description: cmd.description || "No Description found.",
                    };
                });

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });

        const embed = new EmbedBuilder()
            .setColor('DARK_AQUA')
            .setDescription(`Please choose a category in the dropdown menu.`);

        const components = (state) => [
            new ActionRowBuilder().addComponents(
                new SelectMenuBuilder()
                    .setCustomId('help-menu')
                    .setPlaceholder("Please select a category")
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from ${cmd.directory} category`,
                                emoji: emojis[cmd.directory.toLowerCase()] || null,
                            };
                        })
                    )
            ),
        ];

        const initialMessage = await message.channel.send({
            embeds: [embed],
            components: components(false),
        });

        const filter = (interaction) => interaction.user.id === message.author.id;

        const collecter = message.channel.createMessageComponentCollector({
            filter,
            componentType: "SELECT_MENU",
            time: 60000,
        });

        collecter.on('collect', (interaction) => {
            const [ directory ] = interaction.values;
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

            interaction.update({ embeds: [categoryEmbed] });
        });

        collecter.on('end', () => {
            initialMessage.edit({ components: components(true) });
        });
    },
};

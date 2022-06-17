const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "audio-filter",
    description: "Manage Audio Filters",
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'list-enabled',
            description: 'Get a List of Currently enabled filters'
        },
        {
            type: 'SUB_COMMAND',
            name: 'disable-all',
            description: 'Disable all enabled filters'
        },
        {
            type: 'SUB_COMMAND',
            name: 'bassboost',
            description: 'Toggle Bass Boost filter',
            options: [
                {
                    name: 'toggle',
                    description: 'Turn on or Off the filter',
                    type: 'BOOLEAN',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'nightcore',
            description: 'Toggle Nightcore filter',
            options: [
                {
                    name: 'toggle',
                    description: 'Turn on or Off the filter',
                    type: 'BOOLEAN',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'vaporwave',
            description: 'Toggle Vaporwave filter',
            options: [
                {
                    name: 'toggle',
                    description: 'Turn on or Off the filter',
                    type: 'BOOLEAN',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'reverse',
            description: 'Toggle Reverse filter',
            options: [
                {
                    name: 'toggle',
                    description: 'Turn on or Off the filter',
                    type: 'BOOLEAN',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'treble',
            description: 'Toggle Treble filter',
            options: [
                {
                    name: 'toggle',
                    description: 'Turn on or Off the filter',
                    type: 'BOOLEAN',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'chorus',
            description: 'Toggle Chorus filter',
            options: [
                {
                    name: 'toggle',
                    description: 'Turn on or Off the filter',
                    type: 'BOOLEAN',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'earrape',
            description: 'Toggle EarRape filter',
            options: [
                {
                    name: 'toggle',
                    description: 'Turn on or Off the filter',
                    type: 'BOOLEAN',
                    required: true
                }
            ]
        },
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
        if (!interaction.member.voice.channel) {
            return interaction.reply({ content: "<:warn:986127753990529065> You must join a Voice Channel to use this command.", ephemeral: true });
        }
        if (!queue) {
            return interaction.reply({ content: `Could not find a ongoing queue`, ephemeral: true });
        }
        if (interaction.member.voice.channel.id !== queue.connection.channel.id) {
            return interaction.reply({ content: `You need to be in the same VC as me to use this command.`, ephemeral: true });
        }
        const option = interaction.options.getBoolean('toggle');

        const embed = new MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK')

        if (args[0] === 'list-enabled') {
            let enabledFilters = await queue.getFiltersEnabled();
            if (!enabledFilters || enabledFilters.length == 0){
                embed.setDescription(`There are currently no active filters. \nUse \`/audio-filter\` to turn On or Off filters.`);
            } else {
                embed.setDescription(`${enabledFilters.map(f => formatString(f)).join("\n").replace("normalizer2", "")}`);
            }
            embed.setTitle(`Enabled Filters`);

            interaction.reply({ embeds: [embed] });

        } else if (args[0] === 'disable-all') {
            let filter = {};
            let enabledFilters = await queue.getFiltersEnabled();
            if (!enabledFilters || enabledFilters.length == 0){
                embed.setDescription(`There are currently no active filters`);
            } else {
                for(let i of enabledFilters){
                    filter[`${i}`] = false;
                }

                queue.setFilters(filter);
                embed.setDescription(`Disabled all filters.`);
            }
            embed.setTitle(`Disable Filters`);

            interaction.reply({ embeds: [embed] });

        } else if (args[0] === 'bassboost') {
            if (option) {
                queue.setFilters({
					bassboost: true,
					normalizer2: true,
				});

                embed.setDescription(`Successfully Enabled BassBoost filter.`);

            } else if (!option) {
                setFilters({
					bassboost: false,
					normalizer2: false,
				});

                embed.setDescription(`Successfully Disabled BassBoost filter.`);                
            }
            embed.setTitle(`BassBoost Filter`);

            interaction.reply({ embeds: [embed] });

        } else if (args[0] === 'nightcore') {
            if (option) {
                queue.setFilters({
					nightcore: true,
					normalizer2: true,
				});

                embed.setDescription(`Successfully Enabled Nightcore filter.`);

            } else if (!option) {
                setFilters({
					nightcore: false,
					normalizer2: false,
				});

                embed.setDescription(`Successfully Disabled Nightcore filter.`);                
            }
            embed.setTitle(`Nightcore Filter`);

            interaction.reply({ embeds: [embed] });

        } else if (args[0] === 'vaporwave') {
            if (option) {
                queue.setFilters({
					vaporwave: true,
					normalizer2: true,
				});

                embed.setDescription(`Successfully Enabled Vaporwave filter.`);

            } else if (!option) {
                setFilters({
					vaporwave: false,
					normalizer2: false,
				});

                embed.setDescription(`Successfully Disabled Vaporwave filter.`);                
            }
            embed.setTitle(`Vaporwave Filter`);

            interaction.reply({ embeds: [embed] });

        } else if (args[0] === 'reverse') {
            if (option) {
                queue.setFilters({
					reverse: true,
					normalizer2: true,
				});

                embed.setDescription(`Successfully Enabled Reverse filter.`);

            } else if (!option) {
                setFilters({
					reverse: false,
					normalizer2: false,
				});

                embed.setDescription(`Successfully Disabled Reverse filter.`);                
            }
            embed.setTitle(`Reverse Filter`);

            interaction.reply({ embeds: [embed] });

        } else if (args[0] === 'treble') {
            if (option) {
                queue.setFilters({
					treble: true,
					normalizer2: true,
				});

                embed.setDescription(`Successfully Enabled Treble filter.`);

            } else if (!option) {
                setFilters({
					treble: false,
					normalizer2: false,
				});

                embed.setDescription(`Successfully Disabled Treble filter.`);                
            }
            embed.setTitle(`Treble Filter`);

            interaction.reply({ embeds: [embed] });

        } else if (args[0] === 'chorus') {
            if (option) {
                queue.setFilters({
					chorus: true,
					normalizer2: true,
				});

                embed.setDescription(`Successfully Enabled Chorus filter.`);

            } else if (!option) {
                setFilters({
					chorus: false,
					normalizer2: false,
				});

                embed.setDescription(`Successfully Disabled Chorus filter.`);                
            }
            embed.setTitle(`Chorus Filter`);

            interaction.reply({ embeds: [embed] });

        } else if (args[0] === 'earrape') {
            if (option) {
                queue.setFilters({
					earrape: true,
					normalizer2: true,
				});

                embed.setDescription(`Successfully Enabled EarRape filter.`);

            } else if (!option) {
                setFilters({
					earrape: false,
					normalizer2: false,
				});

                embed.setDescription(`Successfully Disabled EarRape filter.`);                
            }
            embed.setTitle(`EarRape Filter`);

            interaction.reply({ embeds: [embed] });
        }
    },
};

const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

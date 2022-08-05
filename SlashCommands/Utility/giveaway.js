const { Client, CommandInteraction, ApplicationCommandOptionType } = require("discord.js");
const { ChannelType } = require("discord-api-types/v9");
const ms = require('ms');

module.exports = {
    name: "giveaway",
    description: "Create & Manage Giveaways",
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'start',
            description: 'Start a giveaway',
            options: [
                {
                    name: 'time',
                    description: 'The duration of slowmode',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'winners',
                    description: 'The amount of winners',
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                },
                {
                    name: 'prize',
                    description: 'The giveaway prize',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'requirement',
                    description: 'Required role to win the prize. (Optional)',
                    type: ApplicationCommandOptionType.Role,
                    required: false
                },
                {
                    name: 'channel',
                    description: 'The channel to create giveaway, leave out to use the current channel.',
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: ChannelType.GuildText,
                    required: false
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'reroll',
            description: 'Reroll a giveaway',
            options: [
                {
                    name: 'giveaway',
                    description: 'Giveaway ID or Giveaway URL',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'end',
            description: 'End a ongoing giveaway',
            options: [
                {
                    name: 'giveaway',
                    description: 'Giveaway ID or Giveaway URL',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
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
        if (interaction.member.permissions.has('MANAGE_MESSAGES') || interaction.member.roles.cache.some((r) => r.name === "Giveaway Manager")) {        
            const channel = interaction.options.getChannel('channel') || interaction.channel;

            if (args[0] === 'start') {
                const time = ms(interaction.options.getString('time'));   
                const winCount = interaction.options.getInteger('winners');
                const prize = interaction.options.getString('prize');
                const reqRole = interaction.options.getRole('requirement');

                if (reqRole) {
                    await client.giveawaysManager.start(channel, {
                        duration: time,
                        winnerCount: winCount,
                        prize,
                        hostedBy: interaction.user.id,
                        extraData: reqRole.id,
                        exemptMembers: (member) => !member.roles.cache.has(reqRole.id),
                        messages: {
                            giveaway: "<a:dots:985965965986648104> **GIVEAWAY** <a:dots:985965965986648104>",
                            giveawayEnded: "<a:dots:985965965986648104> **GIVEAWAY ENDED** <a:dots:985965965986648104>",
                            drawing: 'Ends: {timestamp} \nRequired Role: <@&{this.extraData}>',
                            inviteToParticipate: 'React with 🎉 to participate!',
                            winMessage: '{winners} has won the giveaway for **{this.prize}**!\n{this.messageURL}',
                            hostedBy: 'Hosted by: <@{this.hostedBy}>',
                        }
                    }).catch((e) => {
                        interaction.reply({ content: `An Error Occured!`, ephemeral: true });
                        console.log(e);
                        return;
                    });
                    interaction.reply({ content: `Giveaway created successfully.`, ephemeral: true });
                    return;
                } else {
                    await client.giveawaysManager.start(channel, {
                        duration: time,
                        winnerCount: winCount,
                        prize,
                        hostedBy: interaction.user.id,
                        messages: {
                            giveaway: "<a:dots:985965965986648104> **GIVEAWAY** <a:dots:985965965986648104>",
                            giveawayEnded: "<a:dots:985965965986648104> **GIVEAWAY ENDED** <a:dots:985965965986648104>",
                            drawing: 'Ends: {timestamp}',
                            inviteToParticipate: 'React with 🎉 to participate!',
                            winMessage: '{winners} has won the giveaway for **{this.prize}**!\n{this.messageURL}',
                            hostedBy: 'Hosted by: <@{this.hostedBy}>',
                        }
                    }).catch((e) => {
                        interaction.reply({ content: `An Error Occured!`, ephemeral: true });
                        console.log(e);
                        return;
                    });
                    interaction.reply({ content: `Giveaway created successfully.`, ephemeral: true });
                    return;
                }

            } else if (args[0] === 'reroll') {
                let query = interaction.options.getString('giveaway');
                if (query.includes('-')) {
                    query = query.split('-')[1];
                }

                const giveaway = 
                client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id) ||
                client.giveawaysManager.giveaways.find((g) => g.messageURL === query && g.guildId === interaction.guild.id);

                if (!giveaway) return interaction.reply({ content: `Unable to find a giveaway.`, ephemeral: true });
                if (!giveaway.ended) return interaction.reply({ content: `This giveaway isn't ended yet.`, ephemeral: true });

                client.giveawaysManager.reroll(giveaway.messageId, {
                    messages: {
                        congrat: '{winners}! has won the reroll for **{this.prize}**!\n{this.messageURL}',
                        error: 'No valid participations, no new winner(s) can be chosen!'
                    }
                }).catch((e) => {
                    interaction.followUp({ content:`An error occured!`, ephemeral: true });
                    console.log(e);
                    return;
                });
                interaction.reply({ content: `Giveaway rerolled.`, ephemeral: true });

            } else if (args[0] === 'end') {
                let query = interaction.options.getString('giveaway');
                if (query.includes('-')) {
                    query = query.split('-')[1];
                }

                const giveaway = 
                client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id) ||
                client.giveawaysManager.giveaways.find((g) => g.messageURL === query && g.guildId === interaction.guild.id);
                
                if (!giveaway) return interaction.reply({ content: `Unable to find a giveaway.`, ephemeral: true });
                if (giveaway.ended) return interaction.reply({ content: `This giveaway has already ended.`, ephemeral: true });

                client.giveawaysManager.end(giveaway.messageId).catch((e) => {
                    interaction.reply({ content:`An error occured!`, ephemeral: true });
                    console.log(e);
                    return;
                });
                interaction.reply({ content: `Giveaway Ended.`, ephemeral: true });
            }
        } else {
            interaction.reply({ content: `You need either \`MANAGE MESSAGES\` permissions or a role named \`Giveaway Manager\` to use these commands.`, ephemeral: true });
        }
    },
};

const { Client, CommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const got = require('got');

module.exports = {
    name: "reddit",
    description: "Get Reddit Posts from a Subreddit",
    options: [
        {
            name: 'subreddit',
            description: 'Subreddit to pull posts from',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'private',
            description: 'Whether u want to make results private (Ephemeral)',
            type: ApplicationCommandOptionType.Boolean,
            required: false
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
        let input = interaction.options.getString('subreddit');
        if (input.startsWith('r/')) {
            input = input.replace('r/', '');
        }
        let isPrivate = interaction.options.getBoolean('private') || false;
        const whitelist = ["764793093458362408", "689811110668402690"];

        got(`https://www.reddit.com/r/${input}/random/.json`).then(res => {
            let content = JSON.parse(res.body);
            if (!content.length) return interaction.reply({ content: `Please specify a valid Subreddit.`, ephemeral: true });
            //if (content[0].data.children[0].data.is_video || content[0].data.children[0].data.url.includes('youtu')) {
               //REDO
            //}

            if(content[0].data.children[0].data.over_18 && !whitelist.includes(interaction.user.id)) {
                if (!interaction.channel.nsfw) {
                    const warnEmbed = new EmbedBuilder()
                        .setTitle('Woah there, Stop!')
                        .setColor('Red')
                        .setDescription(`This channel is not an Age-Restricted  channel.\nPlease use an Age-Restricted  channel instead.`)
                        .setImage('https://i.imgur.com/AwFgAIH.png')
                        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    
                    interaction.reply({ embeds: [warnEmbed], ephemeral: true });
                    return;
                }
            }

            const redditEmbed = new EmbedBuilder()
                .setTitle(`${content[0].data.children[0].data.title}`)
                .setURL(`https://reddit.com${content[0].data.children[0].data.permalink}`)
                .setImage(`${content[0].data.children[0].data.url}`)
                .setColor('Random')
                .setFooter({ text: `👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}` });

            interaction.reply({ embeds: [redditEmbed], ephemeral: isPrivate });

        }).catch((e) => {
            interaction.reply({ content: `Please specify a valid Subreddit.`, ephemeral: true });
            console.log(e);
            return;
        });
        
    },
};




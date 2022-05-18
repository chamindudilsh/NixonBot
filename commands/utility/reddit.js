const { Message, Client, MessageEmbed } = require("discord.js");
const got = require('got');

module.exports = {
    name: "reddit",
    aliases: [''],
    description: "Get Reddit Posts",
    cooldown: 5000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let input = args.join(" ");
        if (!input) return message.reply({ content: `Specify a Subreddit to Pull posts.` });
        if (input.startsWith('r/')) {
            input = input.replace('r/', '');
        }
        const whitelist = ["764793093458362408", "689811110668402690"];
        
        got(`https://www.reddit.com/r/${input}/random/.json`).then(res => {
            let content = JSON.parse(res.body);
            if (!content.length) return message.reply({ content: `Please specify a valid Subreddit.` });

            if(content[0].data.children[0].data.over_18 && !whitelist.includes(message.author.id) && message.content.toLowerCase().endsWith('-f')) {
                if (!message.channel.nsfw) {
                    const warnEmbed = new MessageEmbed()
                        .setTitle('Woah there, Stop!')
                        .setColor('RED')
                        .setDescription(`This channel is not an NSFW channel.\nPlease use a NSFW channel instead.`)
                        .setImage('https://i.imgur.com/AwFgAIH.png')
                        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    
                    message.reply({ embeds: [warnEmbed] });
                    return;
                }
            }

            const redditEmbed = new MessageEmbed()
                .setTitle(`${content[0].data.children[0].data.title}`)
                .setURL(`https://reddit.com${content[0].data.children[0].data.permalink}`)
                .setImage(`${content[0].data.children[0].data.url}`)
                .setColor('RANDOM')
                .setFooter({ text: `👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}` });

            message.channel.send({ embeds: [redditEmbed] });
        }).catch((e) => {
            message.reply({ content: `Please specify a valid Subreddit.` });
            console.log(e);
            return;
        });
    },
};

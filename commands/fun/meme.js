const { Message, Client, EmbedBuilder } = require("discord.js");
const got = require('got');

module.exports = {
    name: "meme",
    aliases: [''],
    description: "Memes from Reddit",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const subReddits = ["memes", "dankmemes", "wholesomememes"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
      
        got(`https://www.reddit.com/r/${random}/random/.json`).then(res => {
            let content = JSON.parse(res.body);

            const memeEmbed = new EmbedBuilder()
                .setTitle(`${content[0].data.children[0].data.title}`)
                .setURL(`https://reddit.com${content[0].data.children[0].data.permalink}`)
                .setImage(`${content[0].data.children[0].data.url}`)
                .setColor('Random')
                .setFooter({ text: `👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}` });

            message.channel.send({ embeds: [memeEmbed] });
        }).catch(err => console.log(err));
    },
};

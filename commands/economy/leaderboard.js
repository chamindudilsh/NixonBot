const { Message, Client, MessageEmbed, Collection } = require("discord.js");
const Economy = require('../../utils/economy');

module.exports = {
    name: "leaderboard",
    aliases: ['lb'],
    description: "LeaderBoard",
    cooldown: 5000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const sent_msg = await message.channel.send({ content: `Fetching Leaderboard...` });
        const collection = new Collection();

        await Promise.all(
            message.guild.members.cache.map(async (member) => {
                const id = member.id;
                const bal = await Economy.checkWallet(id);
                return bal !== 2000
                    ? collection.set(id, {
                            id,
                            bal,
                        })
                    : null;
            })
        );

        const data = collection.sort((a, b) => b.bal - a.bal).first(10);
        const lb = data.map((v, i) => {
            return `${i+1}) ${client.users.cache.get(v.id).tag} **-** ${v.bal}$`
        });

        const lbEmbed = new MessageEmbed()
            .setTitle(`Server Leaderboard`)
            .setColor('RANDOM')
            .setDescription(`${lb.join('\n')}`)
            .setFooter({ text: `Check ur Place` })
            .setTimestamp();

        sent_msg.edit({ embeds: [lbEmbed] });
    }, 
};

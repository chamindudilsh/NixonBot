const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "editsnipe",
    aliases: ['esnipe'],
    description: "Snipe for edited messages.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.member.permissions.has('MANAGE_MESSAGES') || message.member.roles.cache.has('942075058321502259')) {
            let o_snipe = client.oeditsnipes.get(message.channel.id);
            let n_snipe = client.neditsnipes.get(message.channel.id);
            if(!o_snipe) return message.channel.send("There's nothing to esnipe.");
            if(!n_snipe) return message.channel.send("There's nothing to esnipe.");

            const snipeEmbed = new MessageEmbed()
                .setAuthor({ name: `Message By ${o_snipe.author.tag}`, iconURL: o_snipe.author.displayAvatarURL({ dynamic: true }) })
                .setColor('RANDOM')
                .addField(`Old Message`, `${o_snipe.content}`, false)
                .addField(`New Message`, `${n_snipe.content}`, false)
                .setFooter({ text: `Sniped By ${message.author.username}` })
                .setTimestamp();

            message.channel.send({ embeds:[snipeEmbed] });
        } else {
            return;
        }
    },
};

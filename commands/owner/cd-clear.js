const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "cd-clear",
    aliases: [''],
    description: "Clear Cooldowns",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.id !== client.config.owner) return;
        const cdEmbed = new MessageEmbed()
            .setTitle(`Cooldowns Cleared`)
            .setFooter({ text: `Operation Successfull!` })
            .setTimestamp();

        if (args[0] === 'all') {
            try {
                client.Cooldown.clear();
            } catch (e) {
                message.channel.send({ content: `An Error Occured` });
                return;
            }
            cdEmbed.setDescription(`Cleared all cooldowns.`)
            message.channel.send({ embeds: [cdEmbed] });   
            return;
        }
        
        user_id = args[1] || message.author.id;

        try {
            client.Cooldown.delete(`${args[0]}_${user_id}`);
        } catch (e) {
            message.channel.send({ content: `An Error Occured` });
            return;
        }
        cdEmbed.setDescription(`Cleared all cooldowns of <@${user_id}>`)
        message.channel.send({ embeds: [cdEmbed] });    
    },
};

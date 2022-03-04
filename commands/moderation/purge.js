const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "purge",
    aliases: ['clear'],
    description: "Purge messages.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
        let amount = args[0];
        if (!amount) {
            message.reply('Please specify a amount of messages to delete.');
            return;
        }
        if (isNaN(amount)) {
            message.reply('Please enter a real number.');
            return;
        }        
        const target = message.mentions.members.first();        
        amount = parseInt(amount);
        if (amount > 99) return message.reply('You Can\'t delete more than 99 messages at one time.');
        if (amount < 1) return message.reply('You must delete at least 1 message.');
        const del_amount = (amount + 1);
        
        const Response = new MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK');

        if (target) {
            let i = 0;
            const filtered = [];
            const Messages = await message.channel.messages.fetch();
            (await Messages).filter((m) => {
                if (m.author.id === target.id && amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await message.channel.bulkDelete(filtered, true).then((messages) => {
              Response.setDescription(`Cleared ${messages.size - 1} messages from ${target}`);
            }).catch((err) => console.error('Clear messages with user error: ', err));

            let replymsg = await message.channel.send({ embeds:[Response] });
            setTimeout(() => {replymsg.delete()}, 2000);
        } else {
            await message.channel.messages.fetch({ limit: del_amount }).then((messages) => {
                message.channel.bulkDelete(messages);   
                Response.setDescription(`Cleared ${messages.size - 1} messages from this channel.`);            
            }).catch((err) => console.error('Clear message without user error: ', err));
           
            let replymsg = await message.channel.send({ embeds:[Response] });
            setTimeout(() => {replymsg.delete()}, 2000);
        }
    },
};

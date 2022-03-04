const { Message, Client, MessageAttachment } = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
    name: "jail",
    aliases: [''],
    description: "Put someone to Jail",
    cooldown: 5000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });

            let img = await new DIG.Jail().getImage(avatar);
            let attach = new MessageAttachment(img, "jail.png");

            message.channel.send({ files: [attach] });
            return;
        }

        let avatar = mentionedUser.displayAvatarURL({ dynamic: false, format: 'png' });

        let img = await new DIG.Jail().getImage(avatar);
        let attach = new MessageAttachment(img, "jail.png");

        message.channel.send({ files: [attach] });                
    },
};

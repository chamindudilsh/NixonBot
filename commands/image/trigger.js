const { Message, Client, AttachmentBuilder } = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
    name: "trigger",
    aliases: ['triggered'],
    description: "Trigger someone",
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

            let img = await new DIG.Triggered().getImage(avatar);
            let attach = new AttachmentBuilder(img, { name: "triggered.png" });

            message.channel.send({ files: [attach] });
            return;
        }

        let avatar = mentionedUser.displayAvatarURL({ dynamic: false, format: 'png' });

        let img = await new DIG.Triggered().getImage(avatar);
        let attach = new AttachmentBuilder(img, { name: "triggered.png" });

        message.channel.send({ files: [attach] });                
    },
};

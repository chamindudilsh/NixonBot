const { Message, Client, AttachmentBuilder } = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
    name: "affect",
    aliases: [''],
    description: "Affect",
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

            let img = await new DIG.Affect().getImage(avatar);
            let attach = new AttachmentBuilder(img, { name: "affect.png" });

            message.channel.send({ files: [attach] });
            return;
        }

        let avatar = mentionedUser.displayAvatarURL({ dynamic: false, format: 'png' });

        let img = await new DIG.Affect().getImage(avatar);
        let attach = new AttachmentBuilder(img, { name: "affect.png" });

        message.channel.send({ files: [attach] });                
    },
};

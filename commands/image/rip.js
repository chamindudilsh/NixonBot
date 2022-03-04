const { Message, Client, MessageAttachment } = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
    name: "rip",
    aliases: [''],
    description: "R.I.P",
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

            let img = await new DIG.Rip().getImage(avatar);
            let attach = new MessageAttachment(img, "rip.png");

            message.channel.send({ files: [attach], content: `*Press **F** to pay respect.*` });
            return;
        }

        let avatar = mentionedUser.displayAvatarURL({ dynamic: false, format: 'png' });

        let img = await new DIG.Rip().getImage(avatar);
        let attach = new MessageAttachment(img, "rip.png");

        message.channel.send({ files: [attach], content: `*Press **F** to pay respect.*` });            
    },
};

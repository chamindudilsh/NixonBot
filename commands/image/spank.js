const { Message, Client, AttachmentBuilder } = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
    name: "spank",
    aliases: [''],
    description: "Spank someone",
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
            let avatar1 = client.user.displayAvatarURL({ format: 'png' });
            let avatar2 = message.author.displayAvatarURL({ dynamic: false, format: 'png' });

            let img = await new DIG.Spank().getImage(avatar1, avatar2);
            let attach = new AttachmentBuilder(img, { name: "spank.png" });

            message.channel.send({ files: [attach] });
            return;
        }

        let avatar1 = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let avatar2 = mentionedUser.displayAvatarURL({ dynamic: false, format: 'png' });

        let img = await new DIG.Spank().getImage(avatar1, avatar2);
        let attach = new AttachmentBuilder(img, { name: "spank.png" });

        message.channel.send({ files: [attach] });                
    },
};

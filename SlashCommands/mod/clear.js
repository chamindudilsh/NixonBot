const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Purge messages in a channel or a target.",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "Select the amount of messages to delete from a channel or a target.",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Select a user to clear their messages.",
            type: "USER",
            required: false
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK');

        if (Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`Cleared ${messages.size} messages from ${Target}.`);
                interaction.channel.send({ embeds:[Response] }).then((msg) => {
                    msg.delete({ timeout: 2000 });
                }).catch((err) => console.error('Clear embed delete error: ', err));     
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`Cleared ${messages.size} messages from this channel.`);
                interaction.channel.send({ embeds:[Response] }).then((msg) => {                 
                    msg.delete({ timeout: 2000 });
                }).catch((err) => console.error('Clear embed delete error: ', err));
            })
        }
    },
};

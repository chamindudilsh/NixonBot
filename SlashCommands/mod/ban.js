const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Ban a Member from this server.",
    permission: "BAN_MEMBERS",
    options: [
        {
            name: "target",
            description: "Select the member you want to ban.",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Provide a reason to Kick this Member (Optional)",
            type: "STRING",
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
        const { options } = interaction;

        const Target = options.getMember("target");
        const Reason = options.getString("reason") || "No Reason Provided.";

        const Response = new MessageEmbed()
            .setTitle('Ban')
            .setColor('RED')
            .setDescription(`**Offender :** ${Target.tag} ${Target} \n**Reason :** ${Reason} \n**Responsible Moderator :** ${interaction.user.tag}`)
            .setFooter(`ID: ${Target.id}`)
            .setTimestamp();

        if (Target.bannable){
            try {
                await Target.send({ content:`You have been banned from **${interaction.guild.name}**`, embeds:[Response] });
            } catch (err) {
                console.error('DM Error (Ban Slash) :', err);
            }
            Target.ban({ reason: Reason }).then(() => {
                interaction.followUp({ embeds:[Response] });
            });
        } else {
            interaction.followUp({ content:`Either I don't have Permissions to ban ${Target.tag} or I'm not high enough on role hierarchy to do it.` });
        }
    },
};

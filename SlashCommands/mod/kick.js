const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kick a Member from this server.",
    permission: "KICK_MEMBERS",
    options: [
        {
            name: "target",
            description: "Select the member you want to kick.",
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
            .setTitle('Kick')
            .setColor('ORANGE')
            .setDescription(`**Offender :** ${Target.tag} ${Target} \n**Reason :** ${Reason} \n**Responsible Moderator :** ${interaction.user.tag}`)
            .setFooter(`ID: ${Target.id}`)
            .setTimestamp();

        if (Target.kickable){
            try {
                await Target.send({ content:`You have been kicked from **${interaction.guild.name}**`, embeds:[Response] });
            } catch (err) {
                console.error('DM Error (Kick Slash) :', err);
            }
            Target.kick({ reason: Reason }).then(() => {
                interaction.followUp({ embeds:[Response] });
            });
        } else {
            interaction.followUp({ content:`Either I don't have Permissions to kick ${Target.tag} or I'm not high enough on role hierarchy to do it.` });
        }
    },
};

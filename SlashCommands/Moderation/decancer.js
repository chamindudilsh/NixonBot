const { Client, CommandInteraction, Permissions } = require("discord.js");
const decancer = require('decancer');

module.exports = {
    name: "decancer",
    description: "Remove cancerous characters from names",
    options: [
        {
            name: 'user',
            description: 'The User you want to perform the timeout on',
            type: 'USER',
            required: true
        }
    ],
    permissions: [ Permissions.FLAGS.MANAGE_NICKNAMES ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.guild.me.permissions.has('MANAGE_NICKNAMES')) {
            interaction.reply({ content: `I'm missing Permissions: \`MANAGE NICKNAMES\``, ephemeral: true });
            return;
        }
        const member = interaction.options.getMember('user');

        if (interaction.guild.me.roles.highest.position <= member.roles.highest.position) {
            interaction.reply({ content:`I'm not high enough in the role hierarchy to do it.`, ephemeral: true });
            return;
        }

        const reason = "Remove cancerous characters from Name.";
        let old_nick = await member.displayName;
        let noCancer = await decancer(old_nick);

        try {
            await member.setNickname(noCancer, reason)
        } catch (e) {
            interaction.reply({ content: `An error occured.`, ephemeral: true });
            return;
        }
        interaction.reply({ content: `\`${old_nick}\` has changed to \`${noCancer}\`` });
    },
};

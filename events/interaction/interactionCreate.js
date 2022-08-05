const { InteractionType } = require('discord.js');
const client = require("../../index");

client.on("interactionCreate", async (interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.reply({ content: "An error has occured ", ephemeral: true });

        if (cmd.permissions && cmd.permissions.length > 0) {
            if (!interaction.member.permissions.has(cmd.permissions)) 
                return await interaction.reply({ content: `You Don't have permissions to use this command`, ephemeral: true });
        }

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args).catch((e) => {
            console.log(e);
        });

    } else if (interaction.isContextMenuCommand()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);

    } 
});

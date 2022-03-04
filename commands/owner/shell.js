const { Message, Client } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const child = require('child_process');

module.exports = {
    name: "shell",
    aliases: ['sh'],
    description: "Execute Shell commands",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.author.id !== client.config.owner) return;

        const code = args.join(" ");
        if (!code) {
            message.reply({ content: "Please provide some code to execute." });
            return;
        }

        child.exec(code, (err, res) => {
            if(err) return console.log(err);

            if (res.includes(client.config.token)) {
                res = res.replace(client.config.token, "T0K3N H1DD3N");
            }

            message.channel.send(codeBlock(res.slice(0, 2000))).catch((e) => {
                console.log(e);
                message.channel.send({ content: `An Error Occured!` });
                return;
            })
        });
    },
};

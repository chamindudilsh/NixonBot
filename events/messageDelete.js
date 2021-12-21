const client = require("../index");

client.on('messageDelete', async (message) => {
    client.snipes.set(message.channel.id, message);
});
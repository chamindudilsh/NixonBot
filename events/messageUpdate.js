const client = require("../index");

client.on('messageUpdate', async (oldMsg, newMsg) => {
    client.oEsnipes.set(oldMsg.channel.id, oldMsg);
    client.nEsnipes.set(newMsg.channel.id, newMsg);
});
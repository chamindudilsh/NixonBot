const client = require("../../index");

client.on("messageUpdate", async (oldMsg, newMsg) => {
    client.oeditsnipes.set(oldMsg.channel.id, oldMsg);
    client.neditsnipes.set(newMsg.channel.id, newMsg);
});
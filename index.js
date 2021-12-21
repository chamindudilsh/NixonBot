const { Client, Collection, Intents } = require("discord.js");
//const keepAlive = require("./server");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS]
});
module.exports = client;

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.disTube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.snipes = new Collection();
client.oEsnipes = new Collection();
client.nEsnipes = new Collection();
client.config = require("./config.json");

require("./handler")(client);

//keepAlive();
client.login(client.config.token);

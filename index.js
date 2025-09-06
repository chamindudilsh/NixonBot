const { Client, Collection, GatewayIntentBits } = require("discord.js");
const GiveawayManagerWithOwnDatabase = require('./models/giveawayModel');
//const { Player } = require("discord-player");
//const { Reverbnation } = require("@discord-player/extractor");
//const { registerPlayerEvents } = require('./utils/music-events');
//const keepAlive = require("./server");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildMessageReactions, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const giveawaysManager = new GiveawayManagerWithOwnDatabase(client, {
    default: {
        botsCanWin: false,
        embedColor: '#3EB1C5',
        embedColorEnd: '#999999',
        reaction: '🎉'
    }
});

/* ----- Music ------
client.player = new Player(client);
client.player.use("reverbnation", Reverbnation);
registerPlayerEvents(client.player)
*/
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.snipes = new Collection();
client.oeditsnipes = new Collection();
client.neditsnipes = new Collection();
client.Cooldown = new Collection();
client.config = require("./config.json");
client.giveawaysManager = giveawaysManager;

//keepAlive();
require("./handler")(client);
client.login(client.config.token);

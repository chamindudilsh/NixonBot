const { Message, Client } = require("discord.js");

module.exports = {
    name: "choose",
    aliases: [''],
    description: "Choose one from options.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send({ content: `${randomInArray(args)}` });
    },
};

var randomInArray = function (anArray){
	var randomIndex=Math.floor(Math.random()*anArray.length)	
	return anArray[randomIndex];
}
const { Message } = require("discord.js");
/**
 * @param {Message} message 
*/

const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

const randomInArray = function (anArray){
    if (!Array.isArray(anArray)) throw new Error("Input is not an Array.");
	var randomIndex=Math.floor(Math.random()*anArray.length)	
	return anArray[randomIndex];
}

const trim = function (input) {
    return input.length > 1024 ? `${input.slice(0, 1020)} ... ` : input;
}

const rng = Math.floor(Math.random() * 101);

module.exports = {
    formatString,
    randomInArray,
    trim,
    rng,
}

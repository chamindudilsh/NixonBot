const { Message, Client } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "gstart",
    aliases: [''],
    description: "Start a Giveaway",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.member.permissions.has('MANAGE_MESSAGES') || message.member.roles.cache.some((r) => r.name === "Giveaway Manager")) {
            let time = args[0];
            if (!time) return message.reply({  content: `Couldn't pass a valid time for the giveaway.`});
            time = ms(time);

            let winCount = args[1];
            if (!winCount) return message.reply({ content: `Please specify the number of winners for the giveaway.` });
            if (winCount.endsWith('w')) {
                winCount = winCount.replace('w', '');
            }
            if (args[2] === 'none') {
                let prize = args.slice(3).join(" ")
                if (!prize) return message.reply({ content: `Please specify a Prize for the giveaway.` });
                
                await message.delete();
                await client.giveawaysManager.start(message.channel, {
                    duration: time,
                    winnerCount: parseInt(winCount),
                    prize,
                    hostedBy: message.author.id,
                    messages: {
                        giveaway: "<a:dg__nyaspin:896792280613146664>**DANK GAMERS GIVEAWAY**<a:dg__nyaspin:896792280613146664>",
                        giveawayEnded: "<a:dg__nyaspin:896792280613146664>**GIVEAWAY ENDED**<a:dg__nyaspin:896792280613146664>",
                        drawing: 'Ends: {timestamp}',
                        inviteToParticipate: 'React with 🎉 to participate!',
                        winMessage: '{winners} has won the giveaway for **{this.prize}**!\n{this.messageURL}',
                        hostedBy: 'Hosted by: <@{this.hostedBy}>',
                    }
                }).catch((e) => {
                    message.channel.send({ content: `An Error Occured!` });
                    console.log(e);
                })      
                return;                
            }

            let reqRole = message.guild.roles.cache.get(args[2]) || message.mentions.roles.first();
            if (!reqRole) return message.reply({ content: `Please provide a Role ID.` });
            let prize = args.slice(3).join(" ");            
            if (!prize) return message.reply({ content: `Please specify a Prize for the giveaway.` });

            await message.delete();
            await client.giveawaysManager.start(message.channel, {
                duration: time,
                winnerCount: parseInt(winCount),
                prize,
                hostedBy: message.author.id,
                extraData: reqRole.id,
                exemptMembers: (member) => !member.roles.cache.has(reqRole.id),
                messages: {
                    giveaway: "<a:dg__nyaspin:896792280613146664>**DANK GAMERS GIVEAWAY**<a:dg__nyaspin:896792280613146664>",
                    giveawayEnded: "<a:dg__nyaspin:896792280613146664>**GIVEAWAY ENDED**<a:dg__nyaspin:896792280613146664>",
                    drawing: 'Ends: {timestamp} \nRequired Role: <@&{this.extraData}>',
                    inviteToParticipate: 'React with 🎉 to participate!',
                    winMessage: '{winners} has won the giveaway for **{this.prize}**!\n{this.messageURL}',
                    hostedBy: 'Hosted by: <@{this.hostedBy}>',
                }
            }).catch((e) => {
                message.channel.send({ content: `An Error Occured!` });
                console.log(e);
            })
        } else {
            return;
        }
    }, 
};


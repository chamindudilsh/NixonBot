const { Message, Client, MessageEmbed } = require("discord.js");
const weather = require('weather-js');

module.exports = {
    name: "weather",
    aliases: ['wea'],
    description: "Send messages as bot",
    cooldown: 5000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const city = args[0];
        if (!city) return message.reply({ content: `Please specify a Location.` });

        weather.find({ search: args.join(" "), degreeType: "C" }, function(err, result){
            if (err) return message.channel.send(err);
            if (result === undefined || result.length === 0) return message.reply({ content: `Please specify a valid Location.` });

            let current = result[0].current;
            let location = result[0].location;
            let forecast = result[0].forecast;

            const weatherEmbed = new MessageEmbed()
                .setTitle(`Weather info for ${current.observationpoint}`)
                .setDescription(current.skytext)
                .setThumbnail(current.imageUrl)
                .setColor('#00FF00')
                .addField(`Temperature`, `${current.temperature}°C`, true)
                .addField(`Wind Speed`, `${current.winddisplay}`, true)
                .addField(`Humidity`, `${current.humidity}%`, true)
                .addField(`Forecast`, `${forecast[1].date} - ${forecast[1].skytextday} \n ${forecast[2].date} - ${forecast[2].skytextday}`, true)
                .addField(`Timezone`, `UTC ${location.timezone}`, true)
                .setFooter({ text: `${current.date}, ${current.day}` })
                .setTimestamp();

            message.channel.send({ embeds: [weatherEmbed] });
        });
    },
};

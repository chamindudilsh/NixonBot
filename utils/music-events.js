const { MessageEmbed } = require("discord.js");

const MusicEmbed = new MessageEmbed()
    .setColor('LUMINOUS_VIVID_PINK');

const registerPlayerEvents = (player) => {

    player.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
        MusicEmbed.setTitle('<:warn:986127753990529065> An Error Occurred');
        MusicEmbed.setDescription(error.message);
        queue.metadata.channel.send({ embeds:[MusicEmbed] });
    });
    player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.on("trackStart", (queue, track) => {
        MusicEmbed.setTitle(`<a:playing:986126798343532594> ${track.title}`);
        MusicEmbed.setDescription(`Playing: ${track.title}\nChannel: <#${queue.connection.channel.id}>\nDuration: ${track.duration}\nSource: [${formatString(track.source)}](${track.url})`);
        MusicEmbed.setFooter({ text: `Requested by ${track.requestedBy.username}` });
        queue.metadata.channel.send({ embeds:[MusicEmbed] });
    });

    player.on("trackAdd", (queue, track) => {
        MusicEmbed.setTitle(`<:added:986128064033456179> Track Added`)
        MusicEmbed.setDescription(`Added ${track.title} to the queue.\nDuration: ${track.duration}\nSource: ${formatString(track.source)}`);
        MusicEmbed.setFooter({ text: `Requested by ${track.requestedBy.username}` });
        queue.metadata.channel.send({ embeds:[MusicEmbed] });
    });

    player.on("botDisconnect", (queue) => {
        MusicEmbed.setTitle('<:warn:986127753990529065> Disconnected VC');
        MusicEmbed.setDescription(`Force disconnected from the Voice Channel.\nClearing queue!`);
        queue.metadata.channel.send({ embeds:[MusicEmbed] });
    });

    player.on("channelEmpty", (queue) => {
        MusicEmbed.setTitle('<:warn:986127753990529065> Empty Channel');
        MusicEmbed.setDescription(`Voice Channel is empty.\nLeaving Voice Channel.`);
        queue.metadata.channel.send({ embeds:[MusicEmbed] });
    });

    player.on("queueEnd", (queue) => {
        MusicEmbed.setTitle('<a:done:986127228653957170> Queue Ended');
        MusicEmbed.setDescription(`Finished Queue.\nLeaving Voice Channel.`);
        queue.metadata.channel.send({ embeds:[MusicEmbed] });
    });

};

const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

module.exports ={
    registerPlayerEvents,
    MusicEmbed
}
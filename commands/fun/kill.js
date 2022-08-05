const { Message, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "kill",
    aliases: ['murder'],
    description: "Murder is Fun.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const member = message.mentions.users.first();
        if (!member) return message.reply({ content: `How you gonna Murder nobody, NAB` });
        if (member.id === message.author.id) {
            message.reply({ content: `Alright You're dead, now looks like a ghost without a brain.` });
            return;
        }
        
        const replies = ["dies from hitting the floor too hard.", "dies from too much screen time.", "tried to eat soap.", "tried to hack FBI.", "was killed by an alien.", "ate the plactice straw thinking it's paper.", "was killed by you.",
            "dies after seeing how cute hehe catto is.", "tried to hack NASA with html. ||<hack>NASA</hack>||", "dies from waiting for GTA VI", "dies from jealousy.", "fell off from a plane.", "was teleported to the Attack on Titan universe and got eaten by a Titan.",
            "dies of starvation.", "tried to get famous on YouTube by live-streaming something dumb. Skydiving while chained to a fridge.", "was accused of betraying Lord Voldy.", "dies. R.I.P", "killed you after a big fight.", "was killed by a Discord Mod ||Yes they are Evil||",
            "died from Aids.", "died from a high salt intake.", "died after playing with an edgy razor blade fidget spinner.", "ate plastic straws and becamed a dead turtle.", "was sucked into a Black Hole.", "killed you with their dumbness.",
            "dies after swearing on a Discord server.", "dies after getting banned from Discord.", "dies from getting rickrolled.", "is now a frog in the middle of the road. ||P.S the frog died after an tire went over it.||", "was killed by me.", "was the imposter.",
            "dies after watching anime.", "dies by seeing an cringe meme.", "fell out of the world. ||P.S the world is flat.||", "dies from a heart attack.", "dies from choking water.", "kills themselves after realizing how dumb you are.", "was not the imposter.",
            "got stepped on by an mamath.", "was killed by Lord Voldy. ||why did they call **He who shall not be named** with their name.||", "was killed by ||`P H O E N I X 🔥#8946`||", "died from watching too much P@RN","was killed by a Death Eater.", "was deported to Azkaban."
        ];
        let result = replies[Math.floor((Math.random() * replies.length))];

        const footer_texts = ["SUS, very very very SUS", "Amogus", "That was a setup", "LEGIT", "LMFAO NAB", "Get rekt", "Very sad, very", "Who is dat idiot", "Where did they come from", "That case is sus", "nab", "U just killed an innocent human", "Did it hurt", "Ayo wtf", "R.I.P"];
        let footer_rng = footer_texts[Math.floor((Math.random() * footer_texts.length))];

        const killEmbed = new EmbedBuilder()
            .setTitle(`Murder`)
            .setDescription(`${member.username} ${result}`)
            .setColor('Random')
            .setFooter({ text: `${footer_rng}` });
       
        message.channel.send({ embeds: [killEmbed] });
    }, 
};

const Discord = require("discord.js");
const YTDL = require ("ytdl-core");



const TOKEN = "MzY2OTg3NDkxODI1Mjg3MTY5.DL6vXg.Gjl46PeBxJaxMRaAeDyu0Q2Ig9";
const PREFIX = "-";

function generateHex() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var jokes = [
    "Q: Why can't a blonde dial 911?     A: She can't find the eleven.",
    "Q: Can a kangaroo jump higher than a house?     A: Of course, a house doesn’t jump at all.",
    "Loading...",
    "Knock, Knock. Who’s there? Leaf! Leaf who? Leaf the house, you’re not the owner anymore!"
];

var penis = [
    "Sorry to say but women can't do this test :(",
    "Your penis is 1 inches long",
    "Your penis is 2 inches long",
    "Your penis is 3 inches long",
    "Your penis is 4 inches long",
    "Your penis is 5 inches long",
    "Your penis is 6 inches long",
    "Your penis is 7 inches long",
    "Your penis is 8 inches long",
    "Your penis is 9 inches long",
    "Your penis is 10 inches long",
    "Your penis is 11 inches long",
    "Your penis is 12 inches long",
    "Your penis is 13 inches long",
    "Your penis is 14 inches long",
    "Your penis is 15 inches long",
    "Your penis is 16 inches long",
    "Your penis is 17 inches long",
    "Your penis is 18 inches long",
    "Your penis is 19 inches long",
    "Your penis is 20 inches long",
    "Your penis is 21 inches long",
    "Your penis is 22 inches long",
    "Your penis is 23 inches long",
    "Your penis is 24 inches long",
    "Your penis is 25 inches long",
    "Your penis is 26 inches long",
    "Your penis is 27 inches long",
    "Your penis is 28 inches long",
    "Your penis is 29 inches long",
    "Your penis is 30 inches long",
    "YOU GOT THE GOLDEN PENIS YOUR PENIS IS 3000 INCHES LONG!",



];

var name = [
    "Bitch",
    "Oliver",
    "Alex",
    "Alexander",
    "Ryan",
    "Dacia",
    "Daisy",
    "Paige",
    "Valerie",
    "Vanessa",
    "Morten",
    "Sabrina",
    "Sabina",
    "Sachi",
    "Marrick",
    "Brad",
    "Alexis",
    "Elvin",
    "Tayler",
    "Darwin"
];

var fortunes = [
    "Yes",
    "No",
    "Maybe",
    "No one knows"
];

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function() {
    console.log("Youi Ready");
});



bot.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  bot.user.setGame(` -help | ${bot.guilds.size} servers | V1`);
});


bot.on("guildMemberAdd", function(member) {
    // member.guild.channels.find("name", "general").send(member.toString() + "Welcome!");

    member.addRole(member.guild.roles.find("name", "Fans"));

    /*member.guild.createRole({
        name: member.user.username,
        color: generateHex(),
        permissions: []
    }).then(function(role) {
        member.addRole(role);
    }); */
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
            message.channel.send("Pong!");
        break;
        case "servers":
            message.channel.send(bot.guilds.size.toString());
        break;
        case "8ball":
            if (args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.send("Can't read that");
        break;
        case "botinfo":
            var embed = new Discord.RichEmbed()
            .addField("Prefix", "-")
            .addField("Commands", "14")
            .addField("Servers", "22 (AutoUpdate soon)")
            .addField("Creator/Owner", "Enis")
            .setThumbnail(message.author.avatarURL)
            message.channel.send(embed);
        break;
            /*
        break;
        case "removerole":
            message.member.removeRole(message.member.guild.roles.find("name", "Fans"));
        break;
         case "deleterole":
            message.guild.roles("name", "Member").delete();
        break; 
        */
        case "play":
            if (!args[1]) {
                message.channel.send("Please provide a link");
            return;
            }

            if (!message.member.voiceChannel) {
                message.channel.send("You must be in a voicechat");
            return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
        break;
        case "skip":
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();
        break;
        case "stop":
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;
        case "help":
            message.channel.send("Commands type -commands.Bot info type -botinfo.If you need support or anything join Youis official discord server! https://discord.gg/dbngEFd");
        break;
        case "commands":
        var embedcommands = new Discord.RichEmbed()
        .addField("Commands in all", "14")
        .addField("Bot commands", "↓↓↓↓↓↓↓")
        .addField("Botinfo", "Gives information about the bot")
        .addField("8ball", "Ask 8ball an question and it will answer")
        .addField("Penis", "Your penis is (Random number) inches long. (2Secrets)")
        .addField("Joke", "Sends an random joke")
        .addField("Name", "Gives you an random name. (Under upgrade)")
        .addField("Ping", "Pong!")
        .addField("Play", "Plays or queue the url you linked")
        .addField("Skip", "Skips the song")
        .addField("Stop", "Skips every song and leave the channel")
        .addField("Nothing", "Does nothing")
        .addField("Commands", "Does this")
        .addField("Help", "Sends you help")
        .addField("Deleterole", "Deletes the role (Disabled)")
        .addField("Removerole", "Remove the role (Disabled)")
        .addField("Addrole", "Adds the role (Disabled)")
            message.channel.send(embedcommands);
        break; 
        case "joke":
            message.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
        break;
        case "penis":
            message.channel.send(penis[Math.floor(Math.random() * penis.length)]);
        break;
        case "name":
        message.channel.send(name[Math.floor(Math.random() * name.length)]);
    break;
        }
});

bot.login(TOKEN);

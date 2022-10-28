const Discord = require('discord.js');
const bot = new Discord.Client();

// music bot;
const ytdl = require("ytdl-core");
const queue = new Map();

// Discord.js version 1.12

// Bot is running
bot.on('ready', () => {
    console.log('Cortana is Running...');
    // Bot status
    //bot.user.setActivity('ReEeEeEeE' );
    const activities_list = [
        "with the configurations.", 
        "with bids. For futher information, please contact our VP Recruitment!",
        "with some codes.", 
        "Something",
        "with Green's Theorem",
        "with Thermo Dynamics",
        "with Steel Construction Manual."
        // Add more if needed. 
        ]; // creates an arraylist containing phrases you want your bot to switch through.
    

    setInterval(() => {
        const status = activities_list[Math.floor(Math.random() * activities_list.length)]; // generates a random number between 1 and the length of the activities array list (in this case 5).
        bot.user.setActivity(status); // sets bot's activities to one of the phrases in the arraylist.
    }, 18000); // Runs this every 30 Minutes.
})

// Welcome message upon join server and ONLY send to specific channel
// Have rule channel is available to everyone to go through the rule and type i agree prior to join texts

const PREFIX = '>'; // prefix like terminal lines.... Come on now, we mostly engineers so should understand this

// bot.on('','' =>{});

bot.on('message', async message => {
   // const sender = message.author; // person send the message
    const msg = message.content; // user message
    const RULECHANNEL = message.guild.channels.cache.find(c => c.name === "rules");

    console.log("someone is typing")

    // Enforce newcomer to read the rules and agree upon joining
    // Enforce Users to agree to the conditions. Delete the typed message(s) and Grant them Role of 'Newcomer' 
    if (message.channel.name.toLowerCase() == "rules")
    {
        if (message.content.toLowerCase() == 'i agree'){
            message.delete().then(msg => console.log(`User ${msg.author.username} Agreed to rules`)).catch(console.error);
            let NEWMEMBERROLE = message.member.guild.roles.cache.find(role => role.name === "Newcomer");
            //member.guild.roles.cache.find(role => role.name === 'New Member'); 
            message.member.roles.add(NEWMEMBERROLE);
        }
        else{
            message.delete()
             .then(msg => console.log(`Deleted message from ${msg.author.username}`))
             .catch(console.error);
            console.log(`User ${msg.author.username} try to type something other than I AGREE.`);
        }
    }

    // Check for Bad words.
    /* Since this is too highly enforced. Moderators will be checking the server comments. GOOD LUCK to Y'all LOL!
    const BADWORDS = ['/*Insert Bad Words Here*']  // Don't ask me. I suck at cussing so These are common words for me.
    if ( BADWORDS.some(word => message.content.toLowerCase().includes(word)) ){
        message.delete().then(msg => console.log('deleted from ')).catch(console.error);
        message.reply('careful');
    }
    */

    if (message.content.toLowerCase() === 'ping'){
        message.channel.send('pong');
    }

    if (message.content.toLowerCase() === 'beep'){
        message.channel.send('boop');
    }

    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    
    const args = message.content;

    const AudioBotContext = args.substring(PREFIX.length).split(" ");

    // console.log(AudioBotContext);

    const voiceChannel = message.member.voice.channel;
    const serverQueue = queue.get(message.guild.id);
    // if (command = '' ) 

    console.log()

    if (message.content.startsWith(`${PREFIX}play`)){
        if (!voiceChannel) return message.channel.send("You need to be in voice channel to play music")
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send("I Do NOT have permissions to connect to the voice channel")
        if (!permissions.has('SPEAK')) return message.channel.send("I Do NOT have permissions to speak on the voice channel")

        const songInfo = await ytdl.getInfo(AudioBotContext[1])
        const song = {
            title: songInfo.title,
            url: songInfo.video_url
        }

        if (!serverQueue){
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            }
        
            queue.set(message.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join()
                queueConstruct.connection = connection
                play(message.guild, queueConstruct.songs[0])
            } catch(error) {
                console.log(`There was an error connecting to the voice channel: ${error}`)
                queue.delete(message.guild.id)
                return message.channel.send(`There was an error connecting to the voice channel: ${error}`)
            }
        }
        else {
            serverQueue.songs.push(song);
            return message.channel.send(`**${song.title}** has been added to the queue`);
        }
        return undefined;
    }

    else if (message.content.startsWith(`${PREFIX}stop`)) {
        if (!message.member.voice.channel) return message.channel.send("You need to be in the voice channel to stop the music")
        if (!serverQueue) return message.channel.send("There is nothing playing")
        serverQueue.songs = []
        serverQueue.connection.dispatcher.end()
        message.channel.send("I have stopped the music for you")
        return undefined
    }

    else if (message.content.startsWith(`${PREFIX}skip`)){
        if (!message.member.voice.channel) return message.channel.send("You need to be in the voice channel to stop the music")
        if (!serverQueue) return message.channel.send("There is nothing playing")
        serverQueue.connection.dispatcher.end()
        message.channel.send("I have skipped the music for you")
        return undefined
    }

    const ServerStuffs = args.slice(PREFIX.length).trim().split(/ +/g);
    // console.log(ServerStuffs);
    const command = ServerStuffs.shift().toLowerCase();



    if (command === 'psa')
    {
        let context = ServerStuffs.join(' ');
       // const PSACHANNEL = bot.channels.cache.get('/*Insert Channel Page Here*/'); // This is Triangle Announcement Page
        const PSACHANNEL = bot.channels.cache.get('/*Insert Channel Page Here*/'); // This is the Test Server
        PSACHANNEL.send({files: ['./image/Announment_Banner.png']}).then(message => {
            PSACHANNEL.send(context)});
    }

    // Ban COMMAND
    else if (command === 'ban')
    {
        //If the Command kick is not in the server (DM type of message), simply return.
        //if (!message.guild) return;

        // Check for the Freaking ROLE!
        if (message.member.roles.cache.some(role => role.name === 'Moderator'))
        {
            const user = message.mentions.users.first();
            // If we have a user mentioned
            if (user) {
                // Now we get the member from the user
                const member = message.guild.member(user);
                // If the member is in the guild
                if (member) {
                    // Kick the member
                    //* Make sure you run this on a member, not a user!
                    //* There are big differences between a user and a member
                    member
                        .kick('Optional reason that will display in the audit logs')
                        .then(() => {
                        // We let the message author know we were able to kick the person
                        message.reply(`Successfully kicked ${user.tag}`);
                    })
                .catch(err => {
                // An error happened
                // This is generally due to the bot not being able to kick the member,
                // either due to missing permissions or role hierarchy
                message.reply('I was unable to kick the member');
                // Log the error
                console.error(err);
              });
            }  
            else {
                // The mentioned user isn't in this guild
                message.reply("That user isn't in this Server!");
            }
            // Otherwise, if no user was mentioned
            } 
             else {
                message.reply("You didn't mention the user to kick!");
            }
        }
        else{
            message.reply("You have no power here");
        }
    }

    // Kick COMMAND
    else if (command === 'kick')
    {
        //If the Command kick is not in the server (DM type of message), simply return.
        //if (!message.guild) return;

        // Check for the Freaking ROLE!
        if (message.member.roles.cache.some(role => role.name === 'Moderator'))
        {
            const user = message.mentions.users.first();
            // If we have a user mentioned
            if (user) {
                // Now we get the member from the user
                const member = message.guild.member(user);
                // If the member is in the guild
                if (member) {
                    // Kick the member
                    //* Make sure you run this on a member, not a user!
                    //* There are big differences between a user and a member
                    member
                        .kick('Optional reason that will display in the audit logs')
                        .then(() => {
                        // We let the message author know we were able to kick the person
                        message.reply(`Successfully kicked ${user.tag}`);
                    })
                .catch(err => {
                // An error happened
                // This is generally due to the bot not being able to kick the member,
                // either due to missing permissions or role hierarchy
                message.reply('I was unable to kick the member');
                // Log the error
                console.error(err);
                });
            }  
            else {
                // The mentioned user isn't in this guild
                message.reply("That user isn't in this Server!");
            }
            // Otherwise, if no user was mentioned
            } 
             else {
                message.reply("You didn't mention the user to kick!");
            }
        }
        else{
            message.reply("You have no power here");
        }
    }
    
    // Not Recognized Command
    else{
        message.channel.send('Not Recognized Command. Please use >help for manual.');
    }

    
    function play(guild, song) {
        const serverQueue = queue.get(guild.id)

        if (!song) {
            serverQueue.voiceChannel.leave()
            queue.delete(guild.id)
            return
        }

        const dispatcher = serverQueue.connection.play(ytdl(song.url))
        .on('finish', () => {
            serverQueue.songs.shift()
            play(guild, serverQueue.songs[0])
        })
        .on('error', error => {
            console.log(error)
        })
        dispatcher.setVolumeLogarithmic(serverQueue.volume/5)
    }
})

//BASIC logs for server diagnose/information
bot.on('guildMemberAdd', member => {
    console.log('User *' + member.user.username + "* has joined the server!");
});

bot.on('guildMemberRemove', member => {
    console.log('User *' + member.user.username + "* has left the server!");
});

bot.login("/*Insert BOT Token Here*/"); 



// Cortana token is : /*Taken out for Security Aspect*/
// Development bot token is : /*Taken out for Security Aspect*/

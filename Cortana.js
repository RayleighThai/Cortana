const Discord = require('discord.js');
const bot = new Discord.Client();

const activities_list = [
    "with the configurations.", 
    "with the developers console - Ask Ray/Thuan.",
    "with some code.", 
    "with JavaScript with Ray/Thuan",
    "with Green's Theorem",
    "with Thermo Dynamics",
    "with Steel Construction Manual."
    // Add more if needed. 
    ]; // creates an arraylist containing phrases you want your bot to switch through.

// Bot is running
bot.on('ready', () => {
    console.log('Cortana is Running...');
    // Bot status
    //bot.user.setActivity('ReEeEeEeE' );
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        bot.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 1800000); // Runs this every 30 Minutes.
})

// Welcome message upon join server and ONLY send to specific channel
// Have rule channel is available to everyone to go through the rule and type i agree prior to join texts

const PREFIX = '>'; // prefix like terminal lines.... Come on now, we mostly engineers so should understand this

// bot.on('','' =>{});

bot.on('message', message => {
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
    const BADWORDS = ['fuck', 'shit', 'cunt', 'retard']  // Don't ask me. I suck at cussing so These are common words for me.
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

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    

    // if (command = '' ) 


    if (command === 'help')
    {
        message.channel.send(`This is the Help section of the Triangle's Cortana Bot. \n
        There are few functions you can use at this time. For basic, there are this Help command, Kick command, Ban command, and PSA command. 
        --Help Command in which focus on helping YOU understand how to utilize this bot at full usage-- 
        --Kick and Ban Command are for more Priviledge Roles such as ADMINS and Moderators. The reason for that is to prevent member abuse Kick/Ban Command without authorization or prior review. 
        --PSA Command sending out Announcement information that will be highly important to everyone. Thus, DO NOT abuse this command for something simple like Tagging/Mentions. Please leave this command to VP Recruitment or Moderators. \n

        *** That is as much of information for help page as of right now. If you have any questions, comments, or concerns, please do address it to Admins and Moderators. ***`);
    }

    else if (command === 'psa' ) 
    {
        let context = args.join(' ');
        const PSACHANNEL = bot.channels.cache.get('731657751234871316');
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
    else if (command === 'kick'){
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
})

/*
bot.on('debug', e => {
    console.log(e);
});

bot.on('warn', e => {
    console.log(e);
});

bot.on('error', e => {
    console.log(e);
});
*/

//BASIC logs for server diagnose/information
bot.on('guildMemberAdd', member => {
    console.log('User *' + member.user.username + "* has joined the server!");
});

bot.on('guildMemberRemove', member => {
    console.log('User *' + member.user.username + "* has left the server!");
});

bot.login("NjM1OTg0OTkwMzU3OTQ2Mzc5.XsipuQ.t_0LsY0E2uDsm9ptOrGdXY5I0oU"); 


const Discord = require('discord.js');

//const Canvas = require('canvas');


const bot = new Discord.Client();

//const image = File

// Bot is running
bot.on('ready', () => {
    console.log('Cortana is Running...');
    // Bot status
    bot.user.setActivity('Please help Ray/Thuan' );
})

//Welcome message upon join server and ONLY send to specific channel
// Have rule channel is available to everyone to go through the rule and type i agree prior to join texts

const PREFIX = '>'; // prefix like terminal lines.... Come on now, we mostly engineers so should understand this

// bot.on('','' =>{});

bot.on('message', message => {
   // const sender = message.author; // person send the message
    const msg = message.content; // user message
    const RULECHANNEL = message.guild.channels.cache.find(c => c.name === "rules");


    console.log("someone is typing\n")

    //enforce newcomer to read the rules and agree upon joining
    if (message.channel.name == "rules")
    {
        //console.log('hereasdfsdafa sfadsfas \n');
        if (message.content.toLowerCase() == 'i agree')
        {
           // console.log('fuck this shit \n');
            //console.log('user agreed');
            message.delete().then(msg => console.log('deleted from ${msg.author.username}')).catch(console.error);
            
            let NEWMEMBERROLE = message.member.guild.roles.cache.find(role => role.name === "New Member");
            //member.guild.roles.cache.find(role => role.name === 'New Member'); 
            message.member.roles.add(NEWMEMBERROLE);

        }
        else
        {
           message.delete().then(msg => console.log('deleted from ${msg.username}')).catch(console.error);
        }
    }

    // Check for Bad words.
    const BADWORDS = ['fuck', 'shit', 'cunt', 'retard']
    if ( BADWORDS.some(word => message.content.toLowerCase().includes(word)) ){
        message.delete().then(msg => console.log('deleted from ' + $message.username)).catch(console.error);
        message.reply('careful');
    }

    if (message.content.toLowerCase() === 'ping')
    {
        //message.reply('pong');
        message.channel.send('pong');
    }

    if (message.content.toLowerCase() === 'beep')
    {
        //message.reply('boop');
        message.channel.send('boop');
    }


    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    

    // if (command = '' ) 


    if (command === 'help')
    {
        message.channel.send('Well hello there, something there idk \n something here');
    }

    else if (command === 'psa' ) 
    {
        let context = args.join(' ');
        const PSACHANNEL = bot.channels.cache.get('713852858512179221');
        PSACHANNEL.send({files: ['./image/triangle-logo.png']}).then(message => {
            PSACHANNEL.send(context)});
    }

    //Kick COMMAND
    else if (command === 'kick'){
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
                message.reply("That user isn't in this guild!");
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

bot.login("NjM1OTg0OTkwMzU3OTQ2Mzc5.XsipuQ.t_0LsY0E2uDsm9ptOrGdXY5I0oU"); 


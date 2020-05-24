const Discord = require('discord.js');
const bot = new Discord.Client();

//const BOT_TESTING = bot.channels.cache.get('713812190640996382');
//const WELCOME = bot.channels.cache.get('713812060135489598')
//const RULES = bot.channels.cache.get('713812095652724830');

//const New_Member = 713631357875650641;

// Bot is running
bot.on('ready', () => {
    console.log('Cortana is Running...');
    // Bot status
    bot.user.setActivity('Please help Ray/Thuan' );
})

//Welcome message upon join server and ONLY send to specific channel
// Have rule channel is available to everyone to go through the rule and type i agree prior to join texts

//bot.channels.fetch(RULES).then(channel => console.log(channel.name)).catch(console.error);



//enforce newcomer to read the rules and agree upon joining
bot.on('message', message => {
    if (message.channel.name === 'rules')
    {
        console.log('someone sent a msg in the rule channel');
        if (message.content.toLocaleLowerCase() == 'i agree')
        {
            console.log('user agreed');
            message.delete().then(msg => console.log('deleted from ${msg.author.username}')).catch(console.error);
            message.assignrole();
            //woprking good until trying to assign role to user
            message.author.send('hello there');
        }
        else
        {
           message.delete().then(msg => console.log('deleted from ${msg.author.username}')).catch(console.error);
        }
    }
    
})
    




function assignrole()
{

    // Member join the server, will receive a message saying Welcome traveler
    bot.on('guildMemberAdd', member => {
        console.log('a new user arrived');
        member.send('welcome traveler!');
        const channel = member.guild.channels.cache.find( ch => ch.name === 'welcome');
        channel.send("welcomeasdfadsfasfasf" + member.user.username);

        // Find the "New Member" role
        const role = member.guild.roles.cache.find(role => role.name === 'New Member'); 

        member.roles.add(role);
    })


    
};

/*

// Auto-assigning to the bot
bot.on('guildMemberAdd', member => {

    // Find the "New Member" role
    const role = member.guild.roles.cache.find(role => role.name === 'New Member'); 


    // Auto assign role to the newly joined member
    member.roles.add(role);

   
    member.channels.cache.find(channel => channel.name === "welcome").send("User " + member.user.username + "has joined the server!");
  
    // Find the "New Member" role
   const role = member.guild.roles.cache.find(role => role.name === 'New Member'); 
    // Auto assign role to the newly joined member
    member.roles.add(role);
})





// Function of the bot
bot.on("message", (message) => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content === '!help')
    {
        message.channel.send("Help Page insert here.");
    }
    //else if ()




    if (message.content == "r")
    {
        console.log(message.guild.roles); 
    }

    const parts = message.content.split(' ');
    //console.log


    // Display Server Info? with server count
    if (message.content === `${prefix}server`) {
	    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    }
    if (parts[0] == '!role')
    {
        if (parts[1] == 'New Member')
        {
            //
        }
    }


    else if (message.content == 'ping')
    {
        //message.reply('pong');
        message.channel.send('pong');
    }

    else if (message.content == '!hallo')
    {
        console.log(message.guild.roles);
    }

 //   if (message.content == '!help')
 //   {
        //message.reply('pong');
        // THIS WILL be Help manual
 //   }


 //Kick Command
    else if (parts[0] == '!kick')
    {
       const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
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
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
    }
    

})

*/

function addUserRole(roleName, message)
{
    var role = message.guild.roles.cache.find('name',roleName);
    message.member.addRole(role.id)
    return;
}


bot.login("NjM1OTg0OTkwMzU3OTQ2Mzc5.XsipuQ.t_0LsY0E2uDsm9ptOrGdXY5I0oU"); 


# Cortana Discord Bot 

This is a simple DiscordBot created by me, Ray T, so don't expect anything fancy. This bot is constructed over the Summer of 2020 by request of brother Tucker to reach out to more PNMs for the recruitment. I take on the challenge as try on JavaScript in freetime. The bot is not perfect as this is the first JavaScript, DiscordJs I developed. Feel free to reach out for any questions but most of the code have explanation note included explain what it does. 

## Description
Simple bot take on administrative commands (later on added audio bot by request). 

## Unlisted Dependencies
- `JavaScript` everything is written in JavaScript
- `node.js` version 12.X.X
- `DiscordJs` v12
- `forever` to autoStart the bot in the live server
- `ytdl-core` for audio/music bot

## Prep (honestly, look up Youtube tutorial. There are SO MANY!) :
Create your own Discord bot:
- visit DiscordDeveloperPortal
- create new application
  - basic stuffs, you do you. The name will carry on into the Discord.
We need the bot token (**write it down or copy it into a text you gonna need it later**)
- go to bot -> do what you need to do -> get the token

## Have your AWS Server if Triangle still don't have official server.
create your own AWS Server. suggestion? Use FREE Tier cause it's FREE!. also these commands are used in Ubuntu 18.X.X

## Installation
Create your own server through the power of AWS (seriously it's free for a year):
Connect to your AWS instance:
- Assume somehow they have all the necessary builds like javascript.
- Install nodejs : `sudo apt install nodejs`
- Install npm : `sudo apt install npm`
- Install forever : `sudo apt install forever`
- ALWAYS update your machine : `sudo apt update`

locate mainpage
- clone the repo `git clone https:/`
- check files for integrity
- replace bot login with your bot token. It locates at the bot of Cortana.js






## Running the Application
- run `forever start Cortana.js`
if it doesn't work. honestly, just look up forever, npm, ytdl-core, discordJs, NodeJs. it just the installation is the problem.

### NOTE
- This is the legacy since Brother Lewis. He created `Cortana bot` of GroupMe which used for brother contacts database for quick access to brother info and easy to get contact with. So this is legacy bot for Discord since I didn't know how to do database or familiar with python back in the day.

In the words of brother Ray T minn17:
> Good Luck, Have Fun!

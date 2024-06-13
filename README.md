# Shaqbot Discord Project  
*This project was made as a test for a private discord server*

## Overview
This project was set up using the Discord.js version 14 library of Node.js.

The main functions of this project are as a: 
- Music player currently using  the `ytdl-core` Node.js library
- Ticket system 
- New member and admin control
- Gacha inventroy system using `mongoDB` data system
- Social consturct of our minds to do goofy stuff
`ShaqBot_disc` uses the in house command and event handler for bot actions

## Events
`client/ready.js`: Handles and exports the files in the `reminders` folder

`guild/guildMemberAdd.js`: Adds member to `shaqSchema` on first join in server

`guild/messageCreate.js`: Handles `shaqSchema` user data, initial message command recognition, permission and cooldown handling

`reminders/hurricane.js`: Uses a NHC API request to export hurricane info and path pictures [WIP]

`reminders/micreminder.js`: Handles an auto join and auto leave to play sound for mic mute reminder

`reminders/welcome.js`: Handles changing the role of new member on acceptance of rules 

`counters/membercounter.js`: Handles counting all members in the server onto a sample voice channel

## Commands
Any file with the prefix `_dpr_` has been depreciated

`commands/balance.js`: Returns balance of user inventory

`commands/beg.js`: Handles give outs for users inventories 

`commands/clearmessages.js`: Bulk deletes messages in a specific channel

`commands/give.js`: Handles admin give outs for users inventories 

`commands/mcserver`: Uses a `mcstatus.io` API request to export MC server info

`commands/musicplay.js`: Uses `ytdl-core` and `yt-search` to handle playing, skipping, stopping a song in queue recieved from the YouTube™ platform

`commands/mystery.js`: ?

`commands/rules.js`: Returns the set of rules for the server

`commands/searchimage.js`: Uses `images-scraper` to return google search imagery

`commands/suggestions.js`: Handles user suggestions for the server 

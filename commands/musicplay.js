const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
//const { Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'play',
  description: 'Joins and plays a video from youtube',
  async execute(message, args, client) {
   // console.log(message);
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
    if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');
    if (!args.length) return message.channel.send('You need to send the second argument!');

    const validURL = (str) =>{
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if (regex.test(str))
        return true;
      return false;
    }

    if (validURL(args[0])) {
      const  connection = await voiceChannel.join();
      const stream  = ytdl(args[0], {filter: 'audioonly'});
      connection.play(stream, {seek: 0, volume: 1})
      .on('finish', () =>{
        voiceChannel.leave();
        message.channel.send('leaving channel');
      });

      await message.reply(`:thumbsup: Now Playing ***Your Link!***`);
      return;
    }
    
    console.log(voiceChannel.name);
    //const  connection = await voiceChannel.join();
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id, 
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator
    });
    const player = createAudioPlayer();
    

    //finds the first video in the ytSearch function 
    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);
      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }
    //if no video is found display no results found thing 
    const video = await videoFinder(args.join(' '));
    if (!video) {
      message.channel.send('No video results found');
      return;
    }
    //function meant to play/stream the valid youtube link with the audio only filter then excutes the finish fucntion to then leave saying fuck you
     
    const stream  = ytdl(video.url, {filter: 'audioonly'});
    
    const resource = createAudioResource(stream);
    player.play(resource);
    connection.subscribe(player);
    //console.log(resource);
    player.on("error" , (error) => console.error(error));
    /* player.on(AudioPlayerStatus.Playing, () =>{
        message.channel.send('now playing');
    });*/
    player.on(AudioPlayerStatus.Idle , () =>{
        connection.disconnect();
    } );

    /*
    connection.play(stream, {seek: 0, volume: 1})
    .on('finish', () =>{
      voiceChannel.leave();
      message.channel.send("leaving channel");
    });
    */

    //wait for the video to be found then when the video is played send the thumps up now playing thing
    await message.reply(`:thumbsup: Now Playing ***${video.title}***`);
    return;
    }
}

 
 

 

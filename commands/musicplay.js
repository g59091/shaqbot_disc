const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
//const { Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'old_play',
  description: 'Joins and plays a video from youtube',
  async execute(message, args, client) {
    //console.log(message);
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
    if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');
    if (!args.length) return message.channel.send('You need to send the second argument!');

    const validURL = (str) =>{
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      return (regex.test(str)) ? true : false;
    }
    
    //console.log(voiceChannel.name);
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id, 
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator
    });
    const player = createAudioPlayer();

    // defining stream based on if validurl 
    var stream = "";
    if (!validURL(args[0])) {

      // finds the first video in the ytSearch function 
      const videoFinder = async (query) => {
        const videoResult = await ytSearch(query);
        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
      }
      // if no video is found display no results found thing 
      var videoFind = await videoFinder(args.join(' '));
      if (!videoFind) return message.channel.send('No video results found');

      // function meant to play/stream the valid youtube link with the audio only filter then excutes the finish fucntion to then leave saying fuck you
      var stream  = ytdl(videoFind.url, {filter: 'audioonly'});
    } else { 
      var stream  = ytdl(args[0], {filter: 'audioonly'});
    }

    const resource = createAudioResource(stream);
    player.play(resource);
    connection.subscribe(player);
    player.on("error" , (error) => console.error(error));
    player.on(AudioPlayerStatus.Playing, () => {
      //console.log(resource);
      //message.channel.send('now playing');
    });
    player.on(AudioPlayerStatus.Idle , () => {
        connection.disconnect();
    });

    // wait for the video to be found then when the video is played send the thumps up now playing thing
    // var videoTitle = `***${video.title}***`;
    // await message.reply(`:thumbsup: Now Playing` + (validURL(args[0])) ? ` ` : videoTitle);
    return;
  }
}

 
 

 

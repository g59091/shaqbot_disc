// new: option of using play-dl as a way of handling music playing on 
import play from "play-dl";
import { createAudioPlayer, createAudioResource , StreamType, demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } from '@discordjs/voice';

// const queue = new Map();
export default {
  name: "newplay",
  aliases: ["newskip", "newstop"],
  cooldown: 2,
  description: "Joins and plays a video from youtube using play-dl.",
  async execute(message, args, _, cmd) {
    // handle: perm check
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
    if (message.channel.name !== "🎶-music-request") return message.channel.send("Please use this command in the 🎶-music-request channel"); 
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK'))
      return message.channel.send('You dont have the correct permissions');
    if (!args.length && cmd.includes("play"))
      return message.channel.send('You need to send a second argument to play a song!');

    // handle: queue and init connection
    // const server_queue = queue.get(message.guild.id);
    const validURL = (str) => {
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      return (regex.test(str));
    }
    const connection = joinVoiceChannel({
        channelId: voiceChannel.id, 
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator
    });
    //const player = createAudioPlayer();

    // handle: play
    if (cmd.includes("play")) {
      if (!args.length) return message.channel.send("Second keyword needed BND");
      var song = {};
      // url provided: play-dl get info from url
      if (validURL(args[0])) {
        var ytInfo = await play.video_info("play " + args[0]);
        song = {title: ytInfo.video_details.title, url: args[0]};
        //var ytStream = await play.stream_from_info(ytInfo); //, { discordPlayerCompatibility: true });
      }
      // term provided: play-dl search/find with term 
      else {
        var searchTerm = "play " + args.join(' ');
        var ytInfo = await play.search(searchTerm, { limit: 1 });
        if (!ytInfo) return message.channel.send('No video results found');
        song = {title: ytInfo[0].title, url: ytInfo[0].url};
        //var ytStream = await play.stream(ytInfo[0].url); //, { discordPlayerCompatibility: true });
      }
      console.log(song);
      var ytStream = await play.stream(song.url, { discordPlayerCompatibility: true });
      var ytResource = createAudioResource(ytStream.stream, { inputType: ytStream.type });
      var ytPlayer = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Play
        }
      });
      // console.log(ytStream, ytResource, ytPlayer);
      ytPlayer.play(ytResource);
      connection.subscribe(ytPlayer);
      console.log(connection.state.status);
      console.log(ytPlayer.state.status);
      ytPlayer.on('error', error => {
        console.error('Player error:', error);
      });
      connection.on('error', error => {
        console.error('Connection error:', error);
      });
      ytPlayer.on('ready', () => {
        console.log('Now playing!');
      });
      ytPlayer.on('finish', () => {
        console.log('Playback finished');
        connection.disconnect(); // Optional: Disconnect after finishing
      });
      //console.log(ytStream, ytResource);
      /*
      if (!server_queue) {
        // init: queue to push songs onto
        const queue_constructor = {
          voice_channel: voiceChannel,
          text_channel: message.channel,
          connection: null,
          player: null,
          songs: []
        }
        queue.set(message.guild.id, queue_constructor);
        queue_constructor.songs.push(song);
        console.debug("songs succesfully added to queue");

        // handle: set/load queue player
        try {
          queue_constructor.connection = connection;
          queue_constructor.player = player;
          video_player(message.guild, queue_constructor.songs[0]);
        }
        catch (err) {
          queue.delete(message.guild.id);
          message.channel.send("Error connecting to the queue");
          throw err;
        }
      } 
      else {
        server_queue.songs.push(song);
        return message.channel.send(`**${song.title}** added to queue! bitch`);
      }
      */
    }
    // handle pause and stop later
  }
}
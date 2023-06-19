const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { Collection } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");

const queue = new Map();

module.exports = {
    name: "play",
    aliases: ["skip", "stop"],
    cooldown: 2,
    description: "Joins and plays a video from youtube",
    async execute(message, args, client, cmd) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');
        //if (!args.length) return message.channel.send('You need to send the second argument!');
        if (!args.length && cmd == "play") return message.channel.send('You need to send a second argument to play a song!');

        const server_queue = queue.get(message.guild.id);

        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            return (regex.test(str)) ? true : false;
        } 

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id, 
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator
        });

        const player = createAudioPlayer();

        //var stream = "";
        console.log(cmd);
        if(cmd === "play") {
            if(!args.length) return message.channel.send("Second keyword needed BND");
            let song = {};

            if (validURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url};
            } else {
                // finds the first video in the ytSearch function 
                const videoFinder = async (query) => {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }
                // if no video is found display no results found thing 
                var videoFind = await videoFinder(args.join(' '));
                if (!videoFind) return message.channel.send('No video results found');

                // function meant to play/stream the valid youtube link with the audio only filter then excutes the finish fucntion to then leave saying fuck you
                // var stream  = ytdl(videoFind.url, {filter: 'audioonly'});
                song = { title: videoFind.title, url: videoFind.url};
            }

            //console.log(song);

            if(!server_queue) {
                const queue_constructor = {
                    voice_channel: voiceChannel,
                    text_channel: message.channel,
                    connection: null,
                    player: null,
                    songs: []
                }
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
                console.log("songs succesfully added to queue")

                try {
                    //const connection = await voiceChannel.join();
                    queue_constructor.connection = connection;
                    queue_constructor.player = player;
                    video_player(message.guild, queue_constructor.songs[0]);
                    //queue_constructor.resource = createAudioResource(stream);
                    //video_player
                }
                catch(err) {
                    queue.delete(message.guild.id);
                    message.channel.send("Error connecting to the queue");
                    throw err;
                }
            } else {
                server_queue.songs.push(song);
                return message.channel.send(`**${song.title}** added to queue! bitch`)
            }
        }

        else if(cmd === "skip") skip_song(message, server_queue); 
        else if(cmd === "stop") stop_song(message, server_queue);
    }
}
const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);
    if(!song){
        song_queue.connection.disconnect();
        queue.delete(guild.id);
        return;
    } 
    const stream = ytdl(song.url, {filter: "audioonly"});
    const resource = createAudioResource(stream);
    song_queue.player.play(resource);
    song_queue.connection.subscribe(song_queue.player);
    song_queue.player.on("error" , (error) => console.error(error));
    song_queue.player.on(AudioPlayerStatus.Idle , () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`now playing **${song.title}**`);
   /* song_queue.connection.play(stream, {seek: 0, volume: 0.5})
    .on("finish", () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`now playing **${song.title}**`);*/
}
const skip_song = (message, server_queue) => {
    if(!message.member.voice.channel) return message.channel.send("you need to be in the channel to use this dummy");
    if(!server_queue) {
        return message.channel.send(`bro theres no songs in the queue relax`);
    }
    server_queue.songs.shift();
    video_player(message.guild, server_queue.songs[0]);
}

const stop_song = (message, server_queue) => {
    if(!message.member.voice.channel) return message.channel.send("you need to be in the channel to use this dummy");
    server_queue.songs = [];
    server_queue.connection.disconnect();
}
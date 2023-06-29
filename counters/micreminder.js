const { server_id } = require('../c.json');
const path = require("path");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, 
  AudioPlayerStatus } = require("@discordjs/voice");

module.exports = async (client) =>{
  const guild = client.guilds.cache.get(server_id);
  // timer for five minutes
  const timerCheck = 300000;
  // definitely not for Jules :3
  const definitelyNotJules = client.users.cache.find(u => u.tag === "Riceseller#5066").id;

  setInterval(() => {
    // check voice channel for specific user
    const userInGuild = guild.members.cache.get(definitelyNotJules);
    const userVoiceChannel = client.guilds.cache.reduce((channel) => {
      if (userInGuild && userInGuild.voice.channel) {
        return userInGuild.voice.channel;
      }
      return channel;
    }, null);
    // check if user is not muted
    if (userInGuild.voice.selfMute) return console.debug("User is already muted.");

    // check if bot can make/start connection/player
    const connection = joinVoiceChannel({
      channelId: userVoiceChannel.id, 
      guildId: userVoiceChannel.guild.id,
      adapterCreator: userVoiceChannel.guild.voiceAdapterCreator
    });
    // play "microphone check" mp3, bottom text
    const player = createAudioPlayer();
    const micCheckMP3 = path.resolve() + path.sep + "audio" + path.sep + "shaq_jules_check.mp3";
    const resource = createAudioResource(micCheckMP3);

    player.play(resource);
    connection.subscribe(player);
    player.on(AudioPlayerStatus.Idle , () => {
      connection.disconnect();
    });

  }, timerCheck);
}
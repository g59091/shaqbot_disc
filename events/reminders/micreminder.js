const { server_id, remind_user } = require('../../c.json');
const path = require("path");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, 
  AudioPlayerStatus } = require("@discordjs/voice");

module.exports = async (client) =>{
  const guild = client.guilds.cache.get(server_id);

  // timer for seven minutes
  const timerMinutes = 7;
  const timerCheck = timerMinutes * 60 * 1000;

  const refreshMembers = await guild.members.fetch();
  const userYB = client.users.cache.find(u => u.username === remind_user).id; 
  setInterval(() => {
    // check voice channel for specific user
    const userInGuild = guild.members.cache.get(userYB);
    // if (!(userYB && userInGuild)) return console.debug("user not found in voice channel");
    const userVoiceChannel = client.guilds.cache.reduce((channel) => {
      if (userInGuild && userInGuild.voice.channel) {
        return userInGuild.voice.channel;
      }
      return channel;
    }, null);

    // user checks
    if (userInGuild && userInGuild.voice.selfMute) return console.debug("User is already muted.");
    if (!userVoiceChannel) return console.debug("user is not in voice channel");

    // check if bot can make/start connection/player
    const connection = joinVoiceChannel({
      channelId: userVoiceChannel.id, 
      guildId: userVoiceChannel.guild.id,
      adapterCreator: userVoiceChannel.guild.voiceAdapterCreator
    });

    // play "microphone check" mp3, bottom text
    const player = createAudioPlayer();
    const micCheckMP3 = path.resolve() + path.sep + "media" + path.sep + "shaq_reminder_check.mp3";
    const resource = createAudioResource(micCheckMP3);

    player.play(resource);
    connection.subscribe(player);
    player.on(AudioPlayerStatus.Idle , () => {
      connection.disconnect();
    }); 
  
  }, timerCheck);
}
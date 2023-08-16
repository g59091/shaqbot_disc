const { server_id } = require('../../c.json');
const path = require("path");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, 
  AudioPlayerStatus } = require("@discordjs/voice");

module.exports = async (client) =>{
  const guild = client.guilds.cache.get(server_id);
  // timer for eight minutes
  const timerMinutes = 8;
  const timerCheck = timerMinutes * 60 * 1000;
  // todo: we need to comment out (and scrub) all personal names from repo
  var definitelyNotJules = client.users.cache.find(u => u.tag === "Riceseller#5066");
  if (definitelyNotJules) definitelyNotJules = definitelyNotJules.id;
  //const definitelyNotCarlos = client.users.cache.find(u => u.username === "fulaa").id; 

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
    if (userInGuild && userInGuild.voice.selfMute) return console.debug("User is already muted.");

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
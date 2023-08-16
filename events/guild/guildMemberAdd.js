const shaqModel = require("../../models/shaqschema");
console.log("schema add has begun");
//
module.exports = async (client, member) => {
   console.log("building a profile" + JSON.stringify(client).length);
   var profile =  await shaqModel.create({
        userId: member.id,
        serverId: member.guild.id,
        sCoins: 25,
        bank: 0
   });

   profile.save()
   .then(savedUser => {
      console.log('User saved:', savedUser);
   })
   .catch(error => {
      console.error('Error saving user:', error);
   });
}
const shaqModel = require("../../models/shaqschema");
console.log("schema add has begun");
//
module.exports = async (client, member) => {
   console.log("building a profile" + JSON.stringify(client).length);
   var profile =  await shaqModel.create({
        userName: member.author.username,
        userId: member.author.id,
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
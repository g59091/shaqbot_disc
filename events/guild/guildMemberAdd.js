import shaqModel from "../../models/shaqschema.js";
console.log("Synching: DNB_DB...");

export default async (client, member) => {
  console.log("Building: new profile on BND_DB..." + JSON.stringify(client).length);
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
import shaqModel from "../../models/shaqschema.js";
console.log("Schema sync has begun.");

export default async (client, member) => {
  console.log("Building a new profile..." + JSON.stringify(client).length);
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
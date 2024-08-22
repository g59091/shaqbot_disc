import fs from "fs";

export default async (client) => {
  const command_files = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

  for (const file of command_files) {
    // import commands into client
    const command = await import(`../commands/${file}`);
    if (command.default.name)
      client.commands.set(command.default.name, command);
  }
};

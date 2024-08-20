import fs from "fs";

export default async (client) => {
  const command_files = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

  for (const file of command_files) {
    const command = await import(`../commands/${file}`);
    if (command.name)
      client.commands.set(command.name, command);
    else
      continue;
  }
};

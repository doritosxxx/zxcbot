import { config } from "dotenv";
config();

import { Collection, Guild } from "discord.js";
import { client, commands as commandsArray } from "./storage";
import type { CommandBase } from "./class/CommandBase";
import "./deploySlashCommands";
import SilentReplyError from "./errors/SilentReplyError";
import { silentReply } from "./functions";

// Add commands.
const commands = new Collection<string, CommandBase>();
for (const command of commandsArray) {
    if (command) {
        console.log(`Command indexed: ${command.name}`);
        commands.set(command.name, command);
    } else {
        console.error(`command is undefined`);
    }
}

client.once("ready", (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        if (error instanceof SilentReplyError) {
            return silentReply(interaction, error.message);
        }

        console.error(error);
		return silentReply(interaction, "There was an error while executing this command!")
    }
});

client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;

    if (/(da|да)$/.test(msg.content.toLowerCase())) {
        for (const emoji of "🇵🇮🇿🇩🇦") {
            await msg.react(emoji);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

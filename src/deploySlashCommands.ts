import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { client, commands as commandsArray } from "./storage";

require("dotenv").config();

const token = process.env.DISCORD_TOKEN as string;
const clientId = process.env.CLIENT_ID as string;

const commands = commandsArray.map(command => command.build()).map(command => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

async function deployCommands() {
    const guilds = await client.guilds.fetch();

    guilds.forEach(guild =>
        rest
            .put(Routes.applicationGuildCommands(clientId, guild.id), {
                body: commands,
            })
            .then(() =>
                console.log(`Successfully registered application commands on ${guild.name}.`)
            )
            .catch(console.error)
    );
}

deployCommands();

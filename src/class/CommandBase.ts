import { SlashCommandBuilder } from "@discordjs/builders";
import type { CommandInteraction } from "discord.js";
import { SlashCommand } from "../types";

export abstract class CommandBase {
    abstract name: string;
    abstract description: string;

    abstract execute(interaction: CommandInteraction): Promise<void>;

    build(): SlashCommand {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }
}

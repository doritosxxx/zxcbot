import type { SlashCommandBuilder } from "@discordjs/builders";

type SlashCommand = Omit<
    SlashCommandBuilder,
    "addSubcommand" | "addSubcommandGroup"
>;
export default SlashCommand;

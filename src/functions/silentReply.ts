import type { CommandInteraction } from "discord.js";

export default async function silentReply(
    interaction: CommandInteraction,
    message: string
): Promise<void> {
    return interaction.reply({
        content: message,
        ephemeral: true,
    });
}

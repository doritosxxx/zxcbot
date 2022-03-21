import type { CommandInteraction } from "discord.js";
import { CommandBase } from "../class/CommandBase";

class PingCommand extends CommandBase {
    name: string = "ping";
    description: string = "Replies with Pong!";

    execute(interaction: CommandInteraction): Promise<void> {
        return interaction.reply("pong");
    }
}

export default new PingCommand();

import { getVoiceConnection } from "@discordjs/voice";
import { CommandInteraction } from "discord.js";
import { CommandBase } from "../class/CommandBase";
import { silentReply } from "../functions";

class LeaveVoiceCommand extends CommandBase {
    name: string = "leave";
    description: string = "Leaves voice channel";

    execute(interaction: CommandInteraction): Promise<void> {
        if (!interaction.guild) {
            return silentReply(interaction, "Команда доступна только для сервера");
        }

        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {
            return silentReply(interaction, "Бот не находится в голосовом канале.");
        }

        connection.disconnect();
        connection.destroy();

        return interaction.reply("Отключился");
    }
}

export default new LeaveVoiceCommand();

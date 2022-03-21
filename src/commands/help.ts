import type { CacheType, CommandInteraction, Guild } from "discord.js";
import { MessageEmbed } from "discord.js";
import { CommandBase } from "../class/CommandBase";
import { commands } from "../storage";

class HelpCommand extends CommandBase {
    name: string = "help";
    description: string = "Shows commands list.";

    execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        const color = this.getGuildColor(interaction.guild);
        const embed = this.buildHelpEmbed().setColor(color);

        return interaction.reply({ embeds: [embed] });
    }

    private buildHelpEmbed(): MessageEmbed {
        const embed = new MessageEmbed().setTitle("Commands list");

        commands.forEach((command) =>
            embed.addField(command.name, command.description)
        );

        return embed;
    }

    private getGuildColor(guild: Guild | null) {
        return guild?.me?.displayColor ?? "#0057ff";
    }
}

export default new HelpCommand();

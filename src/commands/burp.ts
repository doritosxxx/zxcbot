import {
    createAudioPlayer,
    createAudioResource,
    demuxProbe,
    joinVoiceChannel,
} from "@discordjs/voice";
import { inlineCode } from "@discordjs/builders";
import { CommandInteraction, GuildMember } from "discord.js";
import path from "path";
import { CommandBase } from "../class/CommandBase";
import * as fs from "fs/promises";
import { createReadStream, ReadStream } from "fs";
import { SlashCommand } from "../types";
import { silentReply } from "../functions";

async function probeAndCreateResource(readableStream: ReadStream) {
    const { stream, type } = await demuxProbe(readableStream);
    return createAudioResource(stream, { inputType: type });
}

async function getRandomBurpPath(): Promise<string> {
    const relativePath = "../../resources/audio/burps";
    const files = (await fs.readdir(path.resolve(__dirname, relativePath))).filter(file =>
        /\.(wav|mp3)$/.test(file)
    );

    const name = files[Math.floor(Math.random() * files.length)];
    return path.resolve(__dirname, relativePath, name);
}

function getRandomPhrase(): string {
    const phrases = [
        "Сейчас нарыгаю",
        "Совершаю непроизвольное отхождение смеси газов в ротовую полость",
        "Читаю Ответы mail.ru",
        "Подступает рыгуля",
        "Метаю харчи",
        "Извергаю желудчные газы",
    ];

    return phrases[Math.floor(Math.random() * phrases.length)];
}

class BurpCommand extends CommandBase {
    name: string = "burp";
    description: string = "Нарыгать";

    public build(): SlashCommand {
        return super
            .build()
            .addUserOption(option => option.setName("user").setDescription("User to burp"));
    }

    async execute(interaction: CommandInteraction): Promise<void> {
        if (!interaction.guild || !(interaction.member instanceof GuildMember)) {
            return silentReply(interaction, "Команда доступна только на сервере.");
        }

        const victim = interaction.options.getMember("user") ?? interaction.member;
        if (!(victim instanceof GuildMember) || !victim.voice.channel) {
            return silentReply(
                interaction,
                "Нужно находиться в голосовом канале, чтобы использовать эту команду"
            );
        }

        const channel = victim.voice.channel;
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer();
        const resource = await probeAndCreateResource(createReadStream(await getRandomBurpPath()));

        connection.subscribe(player);
        player.play(resource);

        return interaction.reply(`${getRandomPhrase()} в ${inlineCode(channel.name)}`);
    }
}

export default new BurpCommand();

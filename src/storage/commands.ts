import * as fs from "fs";
import * as path from "path";
import type { CommandBase } from "../class/CommandBase";

const relativePath = "../commands";

const commandFiles = fs
    .readdirSync(path.resolve(__dirname, relativePath))
    .filter(file => file.endsWith(".js"));

export default commandFiles.map(file => require(`${relativePath}/${file}`).default as CommandBase);

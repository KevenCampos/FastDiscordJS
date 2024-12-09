import { ApplicationCommandOption, ApplicationCommandType, AutocompleteInteraction, CommandInteraction } from "discord.js";
import { Client } from ".";

export const slashCommandHandlers = new Map();

export interface ISlashCommandHandler {
    name: string,
    description: string,
    type: ApplicationCommandType,
    run: (client: Client, interaction: CommandInteraction) => any,
    options?: ApplicationCommandOption[],

    autocomplete?: (client: Client, interaction: AutocompleteInteraction) => any,
}

export default class {
    constructor(options: ISlashCommandHandler){
        slashCommandHandlers.set(options.name, options);
    }
}
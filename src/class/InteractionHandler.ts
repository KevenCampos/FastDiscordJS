import { AutocompleteInteraction, Interaction, StringSelectMenuInteraction } from "discord.js";
import { Client } from ".";

export const interactionHandlers = new Map();

export interface IInteractionHandlerOptions {
    customId: string;
    run: (client: Client, interaction: Exclude<Interaction, AutocompleteInteraction> | StringSelectMenuInteraction, ...args: string[]) => void;
    useParams?: boolean;
}

export default class {
    constructor(options: IInteractionHandlerOptions){
        interactionHandlers.set(options.customId, {run: options.run, useParams: options.useParams});
    }
}
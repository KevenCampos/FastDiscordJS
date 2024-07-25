import Discord, { ButtonBuilder, Interaction } from 'discord.js';
import InteractionHandler from "../class/InteractionHandler";
import { Client } from '../class';

type ButtonOptions = {
    customId: string,
    style?: Discord.ButtonStyle,
    label: string,
    disabled?: boolean,
    emoji?: string,
    url?: string,
    onClick?: (client: Client, interaction: Interaction, ...args: string[]) => void
}

const CreateButton = ({customId, style, label, disabled = false, emoji, url, onClick}: ButtonOptions): ButtonBuilder => {
    try {

        if (!customId && !url && !onClick) throw new Error('>> Button: customId or url or onClick is required');
        if (customId && url) throw new Error('>> Button: customId and url cannot be used together');
        if (!label) throw new Error('>> Button label is required');

        const button = new ButtonBuilder()
            .setLabel(label)
            .setStyle(style || 1)
            .setDisabled(disabled || false);

        if (emoji) button.setEmoji(emoji);

        if (url) {
            button.setURL(url);
        } else if (onClick) {
            customId = `${label.replace(/ /g, "_").toLowerCase()}_${style}_${disabled}_${emoji}`;
            new InteractionHandler({ customId: customId, run: onClick });
        }

        if (customId) button.setCustomId(customId);

        return button;
        
    } catch (error: any) {
        if (error?.message?.includes("Expected the value to be one of the following enum values:")) {
            return new ButtonBuilder()
                .setLabel("Style Button Invalid")
                .setStyle(4)
                .setDisabled(true)
                .setCustomId(Math.random().toString(36).substring(7));
        } else {
            throw new Error(error?.message || "unidentified error");
        }
    }
}

export default CreateButton;


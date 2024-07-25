import { ActionRowBuilder, AnyComponentBuilder } from 'discord.js';

function CreateRow(...components: any[]): ActionRowBuilder<any> {
    if (components.length === 0 || (Array.isArray(components[0]) && components[0].length === 0)) {
        throw new Error('>> ActionRowComponent requires at least one component');
    }

    // Flatten the array if the first element is an array
    if (Array.isArray(components[0])) components = components[0];

    if (components.length > 5) throw new Error('>> ActionRowComponent can only have up to 5 components');

    const row = new ActionRowBuilder<any>();
    row.addComponents(...(components as any[]));

    return row;
}

export default CreateRow;

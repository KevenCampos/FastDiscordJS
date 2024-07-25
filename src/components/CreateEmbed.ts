import Discord, { APIEmbedField, ColorResolvable, EmbedAuthorOptions, EmbedFooterOptions } from "discord.js";


type BaseEmbedData = {
    title?: string;
    description?: string;
    color?: ColorResolvable;
    footer?: EmbedFooterOptions;
    fields?: APIEmbedField[];
    author?: EmbedAuthorOptions;
    image?: string;
    thumbnail?: string;
    timestamp?: boolean;
};

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = 
    Pick<T, Exclude<keyof T, Keys>> & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];

type embedData = RequireAtLeastOne<BaseEmbedData>;

const CreateEmbed = (embedData: embedData) => {
    const title = embedData.title;
    const description = embedData.description;
    const color = embedData.color;
    const footer = embedData.footer;
    const fields = embedData.fields;
    const author = embedData.author;
    const image = embedData.image;
    const thumbnail = embedData.thumbnail;
    const timestamp = embedData.timestamp;

    const embed = new Discord.EmbedBuilder();

    if (fields) {
        fields.forEach(field => {
            if (!field.name || !field.value) return new Error('>> Field name and value are required');
            embed.addFields({name: field.name, value: field.value, inline: field.inline || false});
        })
    }


    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (color) embed.setColor(color as ColorResolvable);    
    if (footer) embed.setFooter(footer);
    if (author) embed.setAuthor(author);
    if (image) embed.setImage(image);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (timestamp) embed.setTimestamp();

    return embed;
}

export default CreateEmbed;
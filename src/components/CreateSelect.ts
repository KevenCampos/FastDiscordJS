import { UserSelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ChannelSelectMenuBuilder, RoleSelectMenuBuilder, ChannelType } from 'discord.js';

interface OptionData {
    label: string;
    value: string | number;
    emoji?: string;
    description?: string;
    default?: boolean;
}

interface MenuData {
    customId: string;
    placeholder: string;
    options: OptionData[];
    minValue?: number;
    maxValue?: number;
    type?: ChannelType;
}

export default class CreateSelect {
    UserSelectMenuBuilder(menuData: MenuData): UserSelectMenuBuilder {
        try {

            const customId = menuData.customId;
            const placeholder = menuData.placeholder;
            let minValue = menuData.minValue;
            let maxValue = menuData.maxValue;

            if (!customId) throw new Error('>> SelectMenu custom_id is required');
            if (!placeholder) throw new Error('>> SelectMenu placeholder is required');
            if (minValue === undefined) minValue = 1;
            if (maxValue === undefined) maxValue = 1;

            const selectMenu = new UserSelectMenuBuilder() as UserSelectMenuBuilder;
            selectMenu.setCustomId(customId);
            selectMenu.setPlaceholder(placeholder);
            selectMenu.setMinValues(minValue);
            selectMenu.setMaxValues(maxValue);

            return selectMenu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    StringSelectMenuBuilder(menuData: MenuData): StringSelectMenuBuilder {
        try {
            const customId = menuData.customId
            const placeholder = menuData.placeholder
            let minValue = menuData.minValue
            let maxValue = menuData.maxValue

            if (!customId) throw new Error('>> SelectMenu custom_id is required');
            if (!placeholder) throw new Error('>> SelectMenu placeholder is required');
            if (minValue === undefined) minValue = 1;
            if (maxValue === undefined) maxValue = 1;
            if (!menuData.options || menuData.options.length <= 0) throw new Error('>> SelectMenu options is required. You need to pass an array of options');

            const selectMenu = new StringSelectMenuBuilder();
            selectMenu.setCustomId(customId);
            selectMenu.setPlaceholder(placeholder);
            selectMenu.setMinValues(minValue);
            selectMenu.setMaxValues(maxValue);

            menuData.options.forEach(option => {
                if (!option.label) throw new Error('>> SelectMenu option label is required');
                if (!option.value) throw new Error('>> SelectMenu option value is required');

                const optionBuilder = new StringSelectMenuOptionBuilder();
                optionBuilder.setLabel(option.label);
                optionBuilder.setValue(String(option.value));

                if (option.emoji) optionBuilder.setEmoji(option.emoji);
                if (option.description) optionBuilder.setDescription(option.description);
                if (option.default) optionBuilder.setDefault(option.default);

                selectMenu.addOptions(optionBuilder);
            });

            return selectMenu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    ChannelSelectMenuBuilder(menuData: MenuData): ChannelSelectMenuBuilder {
        try {
            const customId = menuData.customId
            const placeholder = menuData.placeholder
            let minValue = menuData.minValue
            let maxValue = menuData.maxValue
            let type = menuData.type

            if (!customId) throw new Error('>> SelectMenu custom_id is required');
            if (!placeholder) throw new Error('>> SelectMenu placeholder is required');
            if (minValue === undefined) minValue = 1;
            if (maxValue === undefined) maxValue = 1;
            if (!type) type = ChannelType.GuildText;

            const selectMenu = new ChannelSelectMenuBuilder();
            selectMenu.setCustomId(customId);
            selectMenu.setPlaceholder(placeholder);
            selectMenu.setMinValues(minValue);
            selectMenu.setMaxValues(maxValue);
            selectMenu.setChannelTypes(type);

            return selectMenu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    RoleSelectMenuBuilder(menuData: MenuData): RoleSelectMenuBuilder {
        try {
            const customId = menuData.customId
            const placeholder = menuData.placeholder
            let minValue = menuData.minValue
            let maxValue = menuData.maxValue

            if (!customId) throw new Error('>> SelectMenu custom_id is required');
            if (!placeholder) throw new Error('>> SelectMenu placeholder is required');
            if (minValue === undefined) minValue = 1;
            if (maxValue === undefined) maxValue = 1;

            const selectMenu = new RoleSelectMenuBuilder();
            selectMenu.setCustomId(customId);
            selectMenu.setPlaceholder(placeholder);
            selectMenu.setMinValues(minValue);
            selectMenu.setMaxValues(maxValue);

            return selectMenu;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

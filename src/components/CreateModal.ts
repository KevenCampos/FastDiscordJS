import { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, CommandInteraction, ButtonInteraction } from "discord.js";

type ModalInputOptions = {
    label: string;
    customId: string;
    style?: TextInputStyle;
    value?: string;
    required?: boolean;
    placeholder?: string;
}

type ModalData = {
    title: string;
    inputs: ModalInputOptions[];
    customId: string;
}

class CustomModalBuilder extends ModalBuilder {
    show(interaction: any) {
        interaction.showModal(this);
    }
}

const CreateModal = (modalData: ModalData) => {
    const { title, inputs, customId } = modalData;

    if (!title) {
        throw new Error('>> Modal title is required');
    }

    if (!inputs || inputs.length === 0) {
        throw new Error('>> Modal inputs are required');
    }

    if (!customId) {
        throw new Error('>> Modal customId is required');
    }

    const modal = new CustomModalBuilder()
        .setTitle(title)
        .setCustomId(customId!);

    inputs.forEach(input => {
        if (!input.label || !input.customId) {
            throw new Error('>> Input label and customId are required');
        }

        const newComponent = new TextInputBuilder()
            .setCustomId(input.customId)
            .setLabel(input.label)
            .setStyle(input.style || TextInputStyle.Short)
            .setRequired(input.required || false)

        if (input.value) newComponent.setValue(input.value);
        if (input.placeholder) newComponent.setPlaceholder(input.placeholder);

        modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(newComponent));
    });

    return modal;
}

export default CreateModal;

// const modal = CreateModal({ title: "teste", customId: "customId", inputs: [{label: "Um text Input", customId: "teste"}]})
// modal.show(interaction)
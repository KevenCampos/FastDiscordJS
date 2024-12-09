import { InteractionHandler, SlashCommand } from "class";
import { CreateButton, CreateRow, CreateSelect } from "components";
import { ApplicationCommandType } from "discord.js";

new SlashCommand({
    name: "test",
    description: "Test command",
    type: ApplicationCommandType.ChatInput,

    options: [
        {
            name: "option1",
            description: "Option 1",
            type: 3,
            required: true,
            autocomplete: true
        }
    ],

    autocomplete: async (client, interaction) => {
        console.log("Autocomplete test command");
    },

    run: async (client, interaction) => {

        const options = [
            {label: "Option 1", value: "option1"},
            {label: "Option 2", value: "option2"},
            {label: "Option 3", value: "option3"}
        ]
        
        const components = [
            CreateRow([
                new CreateSelect().StringSelectMenuBuilder({customId: "test-select", placeholder: "Select a value", options, getValueInLastParam: true})
            ])
        ]

        return interaction.reply({content: 'Hello World! 2', components, ephemeral: true });   
    }
})

new InteractionHandler({
    customId: "test-select",

    run: async (client, interaction, param1, param2, valueOfOption) => {
        return interaction.reply({content: `You selected ${param1}, ${param2} and ${valueOfOption}`, ephemeral: true});
    }
})
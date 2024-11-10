
# FastDiscordJS

Fast Discord JS is an unofficial extension of the "discord.js" library. Our extension aims to simplify the development of Discord bots, promoting cleaner code and easier maintenance.

## Features
- Error prevention with user-friendly messages
- Callback functions
- Less code, more efficiency
- Code and performance optimization

## Installation
```sh
npm install fast-discord-js
```
## Get starting
```js
import { GatewayIntentBits } from "discord.js";
import { Client } from "fast-discord-js";

const client = new Client({ autoImport: ["./components", "./commands"], intents: [GatewayIntentBits.MessageContent]});
client.login("YOUR-TOKEN-HERE")

client.on("ready", (client) => {
    console.log("Online! Client:", client.user?.username)
})
```
Autoload and Intents are optional. If no Intent is provided, all intents will be sent to discord.

Autoload is a list of folder paths that will be automatically imported by the system, without the need to use import or require, facilitating the workflow with discord

## Creating a Slash Commands
```js
import { ApplicationCommandType } from "discord.js";
import { SlashCommand } from "../../src";

new SlashCommand({
    name: "commandtest",
    description: "Testing slash command system",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {
        return interaction.reply({content: `Hello World!`, ephemeral: true});
    }
})
```
This code creates a slash command called "commandtest", and so this command to execute the "run" function will be called.

## Invoking Interaction
```js
new SlashCommand({
    name: "test",
    description: "testing",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {

        // Using client.invokeInteraction to invoke other interaction
        client.invokeInteraction("say-hello", interaction);
    }
})

new InteractionHandler({
    customId: "say-hello",
    run: async (client, interaction) => {
        return interaction.reply("I was invoked by the test command! Hello World :)")
    }
})
```
In the code above we created a command that invokes an interaction with the customId "say-hello". When this interaction is invoked, it uses the reply method to respond to this interaction. Note that the interaction received by InteractionHandler is the same interaction that was received by SlashCommand, so this function will not generate a different interaction, just take advantage of the existing one.

Below, we will take a deeper look at InteractionHandler

## Interaction Handlers
```js
new InteractionHandler({
    customId: "test2",
    run: async (client, interaction) => {
        return interaction.reply("I was invoked by the test command!")
    }
})
```
This code defines a handler for an interaction with a specific name, as soon as this interaction is issued through some component (button, modal or select) the InteractionHandler "run" function will be called.

## Interaction Handler With Parameters
```js
new SlashCommand({
    name: "test",
    description: "testing",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {

        // Using client.invokeInteraction to invoke other interaction and passing two parameters splited by ":"
        client.invokeInteraction("say-hello-with-parameters:lorem:ipsum", interaction);
    }
})

new InteractionHandler({
    customId: "say-hello",
    useParams: true, // its necessary if your use params
    
    run: async (client, interaction, param1, param2) => {
        console.log(param1, param2) // return: "lorem, ipsum" recived by parameters in SlashCommand
        return interaction.reply("I was invoked by the test command! Hello World :)")
    }
})
```

In the example above we call a handler passing parameters to it through invokeInteraction in SlashCommand, but it is good to remember that parameters can be sent through components, such as Button, Modal, Select...

If no parameters are sent, the values ​​received in the interactionHandler run will be "undefined".

## Authors

- [@KevenCampos](https://www.github.com/KevenCampos)
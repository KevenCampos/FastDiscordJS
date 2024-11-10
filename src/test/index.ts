import FastClient from "class/Client";
import { getEnv } from "./functions/utils";

const client = new FastClient({ autoImport: ["src/test/commands"]});
client.login(getEnv("TOKEN"));

client.on("ready", () => {
    console.log("Bot is ready as " + client.user?.tag);    
});
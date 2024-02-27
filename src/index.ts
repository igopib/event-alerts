import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import { parseAbiItem, stringify } from "viem";
import { publicClient } from "./client";
import "dotenv/config";
import { channel } from "diagnostics_channel";

interface BondDetails {
  from: string;
  to: string;
  value: string;
}

let savedLogs: BondDetails[] = [];
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

await publicClient.watchEvent({
  address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  event: parseAbiItem(
    "event Approval(address indexed from, address indexed to, uint value)",
  ),
  onLogs: (logs: any) => {
    savedLogs = [];
    logs.forEach((log: any) => {
      savedLogs.push(log.args); // Push the args property of each log object into savedLogs
    });
    sendMessage();
  },
});

function sendMessage() {
  console.log(
    "----------------------------------------------------------------",
  );
  console.log(savedLogs);
  const channel = client.channels.cache.get(
    "1205801154282266675",
  ) as TextChannel;
  if (!channel) {
    console.error("Channel not found");
    return;
  }
  try {
    savedLogs.forEach((data) => {
      const message = `__**New Approval**__ \n From: ${data.from}\nTo: ${data.to}`;
      channel.send(message);
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});
client.login(process.env.TOKEN);

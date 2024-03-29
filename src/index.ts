import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import { parseAbiItem, Address, formatEther } from "viem";
import { publicClient } from "./client.js";
import "dotenv/config";

interface BondDetails {
  principal: string;
  maturity: string;
  sender: Address;
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
  address: '0x0bf570dd80Aa5AF57C6d0Eacd59512237b25a6FB',
  event: parseAbiItem(
    "event Deposit(address indexed sender, uint256 indexed tokenId, uint256 principal, uint256 maturity, address token, uint256 bondFee)",
  ),
  onLogs: (logs: any) => {
    savedLogs = [];
    logs.forEach((log: any) => {
      savedLogs.push(log.args);
    });
    sendMessage();
  },
});

function sendMessage() {
  const channel = client.channels.cache.get(
    "1205801154282266675",
  ) as TextChannel;
  if (!channel) {
    console.error("Channel not found");
    return;
  }
  try {
    savedLogs.forEach((data) => {
      const message = `__**New Bond**__ \n Amount: ${data.principal} StETH\nMaturity: ${data.maturity}`;
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

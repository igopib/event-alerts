import { Client, GatewayIntentBits, SlashCommandBuilder } from 'discord.js'
import { formatEther, parseAbiItem } from 'viem'
import { publicClient } from './client'
import { abi } from '../utils/abi'

import 'dotenv/config'

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
})

// const logs = await publicClient.watchEvent({
//   address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
//   abi: abi,
//   eventName: 'Approval',
// })

const unwatch = publicClient.watchEvent({
  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  event: parseAbiItem('event Approval(address indexed from, address indexed to, uint value)'),
  onLogs: (logs: any) => console.log(logs),
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`)
})
// client.on('messageCreate', async (message) => {
//   if (message.content === 'log') {
//     message.reply(logs)
//   }
// })
client.login(process.env.TOKEN)

import { Client, GatewayIntentBits } from 'discord.js'
import 'dotenv/config'

const TOKEN = process.env.TOKEN
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`)
})

client.login(TOKEN)

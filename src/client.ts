import { createPublicClient, http } from 'viem'
import { polygonMumbai } from 'viem/chains'
import 'dotenv/config'

const ALCHEMY_API = process.env.ALCHEMY_API

export const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http(ALCHEMY_API),
})

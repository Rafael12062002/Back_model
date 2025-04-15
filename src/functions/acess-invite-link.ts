import { db } from '../drizzle/client'
import { subscription } from '../drizzle/schema/subscription'
import { redis } from '../redis/client'

interface AccesInviteLinkParams {
  subscriberId: string
}

export async function acessInviteLink({ subscriberId }: AccesInviteLinkParams) {
  await redis.hincrby('referral:acces-count', subscriberId, 1)
}

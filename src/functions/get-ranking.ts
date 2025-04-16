import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscription } from '../drizzle/schema/subscription'
import { redis } from '../redis/client'

export async function getRanking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')
  const subscribeIdAndScore: Record<string, number> = {}

  for (let i = 0; i < ranking.length; i += 2) {
    subscribeIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscribers = await db
    .select()
    .from(subscription)
    .where(inArray(subscription.id, Object.keys(subscribeIdAndScore)))

  const rankingwithScore = subscribers
    .map((subscriber) => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscribeIdAndScore[subscriber.id],
      }
    })
    .sort((sub1, sub2) => {
      return sub2.score - sub1.score
    })

  return { rankingwithScore }
}

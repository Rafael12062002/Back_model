import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscription } from '../drizzle/schema/subscription'

interface SubscribeToEventParams {
  name: string
  email: string
}

export async function subscribeToEvent({
  name,
  email,
}: SubscribeToEventParams) {
  const subscribers = await db
    .select()
    .from(subscription)
    .where(eq(subscription.email, email))

  if (subscribers.length > 0) {
    return { subscriberId: subscribers[0].id }
  }
  const result = await db
    .insert(subscription)
    .values({
      name,
      email,
    })
    .returning()

  const subscriber = result[0]
  return { subscriberId: subscriber.id }
}

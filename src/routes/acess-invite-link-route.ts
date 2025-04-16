import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { acessInviteLink } from '../functions/acess-invite-link'

export const acessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      console.log(subscriberId)

      await acessInviteLink({ subscriberId })
      //console.log(await redis.hgetall('referral:acces-count'))
      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId)
      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}

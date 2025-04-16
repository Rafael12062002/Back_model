import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getRanking } from '../functions/get-ranking'

export const getRankingRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/ranking',
    {
      schema: {
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const { rankingwithScore } = await getRanking()

      return { ranking: rankingwithScore }
    }
  )
}

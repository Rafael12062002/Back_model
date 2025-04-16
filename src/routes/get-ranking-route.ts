import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getRanking } from '../functions/get-ranking'

export const getRankingRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/ranking',
    {
      schema: {},
    },
    async (request) => {
      await getRanking()

      return 'ok'
    }
  )
}

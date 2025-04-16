import { access } from 'node:fs'
import { request } from 'node:http'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { acessInviteLinkRoute } from './routes/acess-invite-link-route'
import { getRankingRoute } from './routes/get-ranking-route'
import { getSubscriberInviteClickRoutes } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInviteCountRoutes } from './routes/get-subscriber-invites-count-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Teste',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscribeToEventRoute)
app.register(acessInviteLinkRoute)
app.register(getSubscriberInviteClickRoutes)
app.register(getSubscriberInviteCountRoutes)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)
app.get('/', async (request, reply) => {
  return { message: 'Servidor está funcionando' }
})

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})

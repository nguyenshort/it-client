import { defineEventHandler, readBody, setCookie, deleteCookie } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (!body.token) {
    deleteCookie(event, 'apollo:app.token')
    return {
      status: 401,
      body: {
        message: 'Unauthorized'
      }
    }
  } else {
    try {
      const data: any = await $fetch(config.public.apiBackend + 'users/auth', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + body.token
        }
      })
      if (!data.token) {
        return {
          status: 401,
          body: {
            message: 'Unauthorized'
          }
        }
      }
      setCookie(event, 'apollo:app.token', data.token)
      return {
        status: 200,
        body: {
          message: 'OK'
        }
      }
    } catch (e) {
      return {
        status: 401,
        body: {
          message: 'Unauthorized'
        }
      }
    }
  }
})

import { defineEventHandler, readBody, setCookie, deleteCookie } from "h3"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if(!body.token) {
    deleteCookie(event, 'apollo:app.token')
    return {
      status: 401,
      body: {
        message: 'Unauthorized'
      }
    }
  } else {
    setCookie(event, 'apollo:app.token', body.token)
    return {
      status: 200,
      body: {
        message: 'OK',
      }
    }
  }
})

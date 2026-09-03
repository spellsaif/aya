import {Aya} from './src/aya';

const app = new Aya();

const A = async (c, next) => {
  console.log("A before")

  const response = await next()

  console.log("A after")

  return response
}

const B = async (c, next) => {
  console.log("B before")

  const response = await next()

  console.log("B after")

  return response
}


app
  .use(A)
  .use(B)
  .get('/', (c) => {
  return c.text('Hello, I am Aya!') 
  })
  .get('/anime', (c) => c.text('Aya is not an anime!'))
  .get('/anime/:name', (c)=> c.text(`Anime: ${c.params.name}`))
  .get('/anime/frieren', (c)=> c.text(`Anime: Frieren`))



Bun.serve({
  port: 3000,
  fetch: (request: Request) => app.fetch(request)
})
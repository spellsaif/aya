import {Aya} from './src/aya';
import { HTTPException } from './src/http-exception';

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
  .get("/users/:id/files/*path", (c) => {
    return c.text(`${c.params.id} -> ${c.params.path}`)
  })
  .get('/error', async(c) => {
    throw new HTTPException(401, 'Error');
  })
  .get("/broken", (c) => {
  throw new Error("Something broke")
  })
  .get('/json', c=> {
    return c.json({name: 'Aya'});
  })

  for(let i = 0; i != 10000; i++) {
    app.get(`/${i}`, c => c.text(`id is ${i}`))
  }


console.log('Server is running...')
Bun.serve({
  port: 3000,
  fetch: (request: Request) => app.fetch(request)
})
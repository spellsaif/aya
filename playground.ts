import {Aya} from './src/aya';

const app = new Aya();

app
  .get('/', (c) => {
  return c.text('Hello, I am Aya!') 
  })
  .get('/anime', (c) => c.text('Aya is not an anime!'))
  .get('/anime/:name', (c)=> c.text(`Anime: ${c.params.name}`))


Bun.serve({
  port: 3000,
  fetch: (request: Request) => app.fetch(request)
})
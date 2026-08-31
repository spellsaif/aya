function fetch(request: Request): Response {
  const url = new URL(request.url)

  if(request.method === 'GET' && url.pathname ==='/') {
    return new Response('Welcome to Aya!')
  }
  
  else if(request.method === 'GET' && url.pathname === '/about') {
    return new Response('I am Aya, your simple minimal backend library with type safety')
  }
  return new Response('Not Found', {status: 404})
}

Bun.serve({
  port: 3000,
  fetch
})


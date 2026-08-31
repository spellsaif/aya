function fetch(request: Request): Response {
  return new Response("This is Aya!")
}

Bun.serve({
  port: 3000,
  fetch
})


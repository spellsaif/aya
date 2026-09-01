
function compilePath(path: string) {
  const keys: string[] = []
  const parts = path.split('/')

  const regexParts = parts.map((part) => {
    if (part.startsWith(':')) {
      keys.push(part.slice(1))
      return '([^/]+)'
    }
    return part
  })

  const pattern = regexParts.join('/')
  const regex = new RegExp(`^${pattern}$`)

  return {
    regex,
    keys
  }
}

console.log(compilePath('/anime/:name'))



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

type Route = {
  method: string,
  regex: RegExp,
  keys: string[],
  handler: Function 
}

type MatchResult = {
  handler: Function,
  params: Record<string, string>
}

class Router {
  routes: Route[] = []
  add(method: string, path: string, handler: Function) {
      const {regex, keys} = compilePath(path);
      this.routes.push({
        method,
        regex,
        keys,
        handler
      })
      
      return this;
  }

  match(method: string, path: string): MatchResult | undefined {
    for (const route of this.routes) {
      if(route.method === method) {
        const match = route.regex.exec(path)

        if(!match) continue;

        const params: Record<string, string> = {}
        
        for (let i = 0; i != route.keys.length; i++) {
          params[route.keys[i]] = match[i+1];
        }

        return {handler: route.handler, params}

      }
    }

    return undefined;
  }
}

const router = new Router();
console.log(router.add('GET','/anime/:name', () => {}))
console.log(router.match('GET', '/anime/naruto'));


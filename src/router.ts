import { Context } from "./context"

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

type Handler = (c: Context) => Response | Promise<Response>

type Route = {
  method: string,
  regex: RegExp,
  keys: string[],
  handler: Handler
  specificity: number
}

type MatchResult = {
  handler: Handler,
  params: Record<string, string>
}

export class Router {
  routes: Route[] = []
  add(method: string, path: string, handler: Handler) {
      const {regex, keys} = compilePath(path);

      const specificity = this.specificity(path);
      this.routes.push({
        method,
        regex,
        keys,
        handler,
        specificity
      })

      this.routes.sort((a,b)=> {
        return b.specificity - a.specificity
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

  specificity(path: string) {
    const segments = path.split('/')

    let score = 0;

    for (let i = 1; i < segments.length; i++) {
      const s = segments[i]
      if(s.startsWith(':')) {
        score += 2
      }
      else if(s.startsWith('*')) {
        score += 1
      }
      else {
        score += 3
      }
    }

    return score
  }
}


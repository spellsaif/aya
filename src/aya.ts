import { compose} from "./compose";
import { Context } from "./context";
import { Router } from "./router";

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

export class Aya {
    router = new Router()

    get(path: string, handler: (c: Context) => Response | Promise<Response>) {
        this.router.add('GET', path, handler);

        return this;
    }

    async fetch(request: Request) {
        const url = new URL(request.url);
        const match = this.router.match(request.method, url.pathname);

        if(!match) {
            return new Response("Not Found", {
                status: 404
            })
        }

        const context = new Context(request, match.params);

        const execute = compose([A, B, match.handler])

        return execute(context);
    }
}
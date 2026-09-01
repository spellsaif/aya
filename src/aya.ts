import { Context } from "./context";
import { Router } from "./router";

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

        return match.handler(context);
    }
}
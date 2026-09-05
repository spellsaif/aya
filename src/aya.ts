import { compose} from "./compose";
import { Context } from "./context";
import { HTTPException } from "./http-exception";
import { Router } from "./router";
import { ParamsOf } from "./types";

type Handler<Path extends string> = (c: Context<ParamsOf<Path>>) => Response | Promise<Response> 

export class Aya {
    router = new Router()
    middlewares = []

    use(middleware: Function) {
        this.middlewares.push(middleware);
        return this;
    }

    get<Path extends string>(path: Path, handler: Handler<Path>) {

        const adaptedHandler = (c: Context) => {
            return handler(c as Context<ParamsOf<Path>>)
        }
        this.router.add('GET', path, adaptedHandler);

        return this;
    }

    async fetch(request: Request) {
        try {
            const url = new URL(request.url);
            const match = this.router.match(request.method, url.pathname);

            if(!match) {
                return new Response("Not Found", {
                    status: 404
                })
            }

            const context = new Context(request, match.params);

            const execute = compose([...this.middlewares, match.handler])

            return await execute(context);
        } catch (error) {
            if (error instanceof HTTPException) {
                return new Response(error.message, {status: error.status})
            }

            throw error
        }
    }
}
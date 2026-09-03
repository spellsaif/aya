
export class Context<Params extends Record<string, string> = Record<string, string>> {

    constructor(readonly req: Request, readonly params: Params) {}

    text(data: string): Response {
        return new Response(data, {
            headers: {
                'content-type': 'text/plain; charset=uft-8;'
            }
        })
    }
}

export class Context<P extends Record<string, string>> {

    constructor(readonly req: Request, readonly params: P) {}

    text(data: string): Response {
        return new Response(data, {
            headers: {
                'content-type': 'text/plain; charset=uft-8;'
            }
        })
    }
}
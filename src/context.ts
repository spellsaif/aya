
export class Context {

    constructor(readonly req: Request, readonly params: Record<string, string>) {}

    text(data: string): Response {
        return new Response(data, {
            headers: {
                'content-type': 'text/plain; charset=uft-8;'
            }
        })
    }
}
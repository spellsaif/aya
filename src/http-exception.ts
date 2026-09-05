export class HTTPException extends Error {
    constructor(readonly status: number, message: string) {
        super(message)
    }
}
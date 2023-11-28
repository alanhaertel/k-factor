export class ReynoldsError extends Error {
    constructor (message: string) {
        super(message)
        this.name = 'ReynoldsError'
    }
}

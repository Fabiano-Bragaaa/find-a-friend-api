export class NoPetsFoundError extends Error {
  constructor() {
    super('No pets found.')
  }
}

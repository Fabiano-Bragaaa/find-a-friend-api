export class NoPetsFoundInCityError extends Error {
  constructor() {
    super(`No pets found in this city.`)
  }
}

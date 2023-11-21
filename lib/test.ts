import myModule from '../backend/index.node'

// Use functions exported from the module
export const result = myModule.factorial(2)
console.log(result)

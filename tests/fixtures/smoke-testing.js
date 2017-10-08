const assert       = require('assert')
const { Watchdog } = require('watchdog')

const dog = new Watchdog()
assert(dog)

console.log('Smoke Testing PASSED!')

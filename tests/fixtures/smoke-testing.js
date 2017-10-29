const assert       = require('assert')
const { Watchdog } = require('watchdog')

const dog = new Watchdog()
console.log(`WatchDog v${dog.version()}`)

console.log('Smoke Testing PASSED!')

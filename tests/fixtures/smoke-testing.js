const { Watchdog } = require('watchdog')

const dog = new Watchdog()
dog.init()

console.log('Smoke Testing PASSED!')

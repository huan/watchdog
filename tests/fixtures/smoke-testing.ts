import {
  Watchdog,
  VERSION,
}             from 'watchdog'

async function main () {
  const dog = new Watchdog()
  dog.feed({ data: 'food' })
  dog.sleep()

  if (VERSION === '0.0.0') {
    throw new Error('version should be set before publishing')
  }

  console.log(`WatchDog v${dog.version()} smoke Testing PASSED!`)
  return 0
}

main()
.then(process.exit)
.catch(e => {
  console.error(e)
  process.exit(1)
})

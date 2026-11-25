import {
  Watchdog,
  VERSION,
} from 'watchdog'

async function main () {
  const dog = new Watchdog()
  dog.feed({ data: 'food' })
  dog.sleep()

  if (dog.version() === '0.0.0') {
    throw new Error('version should be set before publishing')
  }

  console.log(`Watchdog v${dog.version()} smoke testing PASSED!`)
  return 0
}

main()
  .then(code => process.exit(code || 0))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })

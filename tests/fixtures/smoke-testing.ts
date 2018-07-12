import { Watchdog } from 'watchdog'

async function main () {
  try {
    const dog = new Watchdog()
    dog.feed({ data: 'food' })
    dog.sleep()
    console.log(`WatchDog v${dog.version()}`)
    console.log('Smoke Testing PASSED!')
    return 0
  } catch (e) {
    console.error(e)
    return 1
  }
}

main()
.then(process.exit)
.catch(e => {
  console.error(e)
  process.exit(1)
})

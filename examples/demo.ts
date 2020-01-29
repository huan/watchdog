import Watchdog from '../'

async function main () {
  const TIMEOUT = 1 * 1000  // 1 second
  const dog = new Watchdog(TIMEOUT)

  const food = { data: 'delicious' }

  dog.on('reset', () => console.info('reset-ed'))
  dog.on('feed',  () => console.info('feed-ed'))

  dog.feed(food)
  // Output: reset-ed

  await new Promise(resolve => setTimeout(resolve, TIMEOUT + 1))
  // Output: reset-ed

  dog.sleep()
  console.info('dog sleep-ed. Demo over.')
}

main()
  .catch(console.error)

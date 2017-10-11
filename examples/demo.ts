import watchdog from '../'

async function main() {
  const TIMEOUT = 1 * 1000  // 1 second
  const dog = new watchdog(TIMEOUT)

  const food = { data: 'delicious' }

  dog.on('reset', () => console.log('reset-ed'))
  dog.on('feed',  () => console.log('feed-ed'))

  dog.feed(food)
  // Output: reset-ed

  await new Promise(resolve => setTimeout(resolve, TIMEOUT + 1))
  // Output: reset-ed

  dog.sleep()
  console.log('dog sleep-ed. Demo over.')
}

main()

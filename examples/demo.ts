import watchdog from '../'

async function main() {
  const TIMEOUT = 1 * 1000  // 1 second
  const dog = new watchdog(TIMEOUT)

  const food = { data: 'delicious' }

  dog.on('reset', () => console.log('got no food before reset fired'))
  dog.on('feed',  () => console.log('feeded'))

  dog.feed(food)
  await new Promise(resolve => setTimeout(resolve, TIMEOUT + 1))

  dog.sleep()
}

main()

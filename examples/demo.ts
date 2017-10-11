import watchdog from '../'

async function main() {
  const dog = new watchdog(1 * 1000)

  const food = {
    data: 'wang',
  }

  dog.on('reset', () => console.log('got no food before reset fired'))
  dog.on('feed', () => console.log('feeded'))
  dog.feed(food)

  await new Promise(resolve => setTimeout(resolve, 1 * 1000 + 1))

  dog.sleep()
}

main()

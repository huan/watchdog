import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  Watchdog,
  type WatchdogFood,
} from './watchdog.ts'

test('starve to reset', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'] })
  t.after(() => t.mock.timers.reset())

  const TIMEOUT = 1 * 1000
  const EXPECTED_FOOD: WatchdogFood = {
    data: 'dummy',
    timeoutMilliseconds: TIMEOUT,
  }

  const watchdog = new Watchdog(TIMEOUT, 'TestWatchdog')
  let resetCalled = false

  watchdog.on('reset', (food, timeout) => {
    resetCalled = true
    assert.equal(timeout, TIMEOUT, 'timeout should equal to TIMEOUT when reset')
    assert.deepEqual(food, EXPECTED_FOOD, 'should get food back when reset')
  })
  watchdog.feed(EXPECTED_FOOD)

  t.mock.timers.tick(TIMEOUT + 1)
  assert.equal(resetCalled, true, 'reset should have been called')
})

test('feed in the middle', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'] })
  t.after(() => t.mock.timers.reset())

  const TIMEOUT = 1 * 1000
  const FEED_TIME = 0.3 * 1000

  const watchdog = new Watchdog(TIMEOUT, 'TestWatchdog')
  watchdog.on('reset', () => {
    assert.fail('should not be reset')
  })
  watchdog.feed({ data: 'dummy' })

  t.mock.timers.tick(FEED_TIME)
  const left = watchdog.feed({ data: 'dummy' })
  assert.equal(left, TIMEOUT - FEED_TIME, 'should get the time left depends on the FEED_TIME')
})

test('sleep()', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'] })
  t.after(() => t.mock.timers.reset())

  const TIMEOUT = 1 * 1000
  const FEED_TIME = 0.3 * 1000

  const watchdog = new Watchdog(TIMEOUT, 'TestWatchdog')
  watchdog.on('reset', () => {
    assert.fail('should not be reset')
  })
  watchdog.feed({ data: 'dummy' })

  t.mock.timers.tick(FEED_TIME)
  watchdog.sleep()

  t.mock.timers.tick(TIMEOUT * 2)

  const left = watchdog.left()
  assert.ok(left < 0, 'time should already passed by...')
})

test('event:feed', (t) => {
  const watchdog = new Watchdog()
  const spy = t.mock.fn()

  watchdog.on('feed', spy)
  watchdog.feed({ data: 'dummy' })
  watchdog.sleep()

  assert.equal(spy.mock.callCount(), 1, 'should fire event:feed')
})

test('event:sleep', (t) => {
  const watchdog = new Watchdog()
  const spy = t.mock.fn()

  watchdog.on('sleep', spy)
  watchdog.sleep()

  assert.equal(spy.mock.callCount(), 1, 'should fire event:sleep')
})

test('version()', () => {
  const dog = new Watchdog()
  assert.ok(dog.version(), 'should get version')
})

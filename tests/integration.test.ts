import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import { Watchdog, VERSION } from '../src/mod.ts'

test('integration: instantiate, feed, and sleep watchdog', () => {
  const dog = new Watchdog(500, 'IntegrationDog')
  assert.equal(dog.name, 'IntegrationDog')
  assert.equal(dog.version(), VERSION)
  const left = dog.feed({ data: 'test-food' })
  assert.ok(typeof left === 'number')
  dog.sleep()
})

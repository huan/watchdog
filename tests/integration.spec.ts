#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { test } from 'tstest'

test('integration', async t => {
  await t.todo('to be written')
})

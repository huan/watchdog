# WATCHDOG

[![NPM Version](https://badge.fury.io/js/watchdog.svg)](https://badge.fury.io/js/watchdog)
[![Build Status](https://travis-ci.com/huan/watchdog.svg?branch=master)](https://travis-ci.com/huan/watchdog)
[![Downloads](http://img.shields.io/npm/dm/watchdog.svg?style=flat-square)](https://npmjs.org/package/watchdog)
[![Powered by TypeScript](https://img.shields.io/badge/Powered%20By-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Greenkeeper badge](https://badges.greenkeeper.io/huan/watchdog.svg)](https://greenkeeper.io/)

A Timer used to Detect and Recover from Malfunctions.

![watchdog](https://huan.github.io/watchdog/images/watchdog.png)
> Picture Credit: [Using Watchdog Timer](https://www.logicsupply.com/explore/io-hub/tutorial-using-beaglebone-black-watchdog-timer/)

## USAGE

```shell
$ npm install watchdog
...
```

```ts
import { Watchdog } from 'watchdog'

const TIMEOUT = 1 * 1000  // 1 second
const dog = new watchdog(TIMEOUT)

const food = { data: 'delicious' }

dog.on('reset', () => console.log('reset-ed'))
dog.on('feed',  () => console.log('feed-ed'))

dog.feed(food)
// Output: feed-ed

setTimeout(function() {
  dog.sleep()
  console.log('dog sleep-ed. Demo over.')
}, TIMEOUT + 1)
// Output: reset-ed.
// Output: dog sleep-ed. Demo over.
```

## DOCUMENT

See [auto generated docs](https://huan.github.io/watchdog)

## SEE ALSO

* [Wikipedia: Watchdog timer](https://en.wikipedia.org/wiki/Watchdog_timer)
* [Yet Another watchdog timer for node.js (and browserify)](https://github.com/andrew-filonenko/ya-watchdog)

## THANKS

Thanks to Damon Oehlman (https://github.com/DamonOehlman) who owned the `watchdog` name of NPM module. He is so kind and nice that passed this name over to me after my request.

## AUTHOR

Huan LI \<zixia@zixia.net\> (http://linkedin.com/in/zixia)

<a href="http://stackoverflow.com/users/1123955/zixia">
  <img src="http://stackoverflow.com/users/flair/1123955.png" width="208" height="58" alt="profile for zixia at Stack Overflow, Q&amp;A for professional and enthusiast programmers" title="profile for zixia at Stack Overflow, Q&amp;A for professional and enthusiast programmers">
</a>

## COPYRIGHT & LICENSE

* Code & Docs © 2017 Huan LI \<zixia@zixia.net\>
* Code released under the Apache-2.0 License
* Docs released under Creative Commons

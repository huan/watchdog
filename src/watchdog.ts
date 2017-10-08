// https://github.com/andrew-filonenko/ya-watchdog
// https://en.wikipedia.org/wiki/Watchdog_timer

import { EventEmitter } from 'events'

import Brolog  from 'brolog'
export const log = new Brolog()

export type WatchdogEvent    = 'feed' | 'reset' | 'sleep'
export type WatchdogListener = (food: WatchdogFood, left: number) => void

export interface WatchdogFood<T = any> {
  data     : any,
  timeout? : number,   // millisecond
  type?    : T
}

export class Watchdog<T = any> extends EventEmitter {
  private timer : NodeJS.Timer | undefined | null  // `undefined` stands for the first time init. `null` will be set by `stopTimer`

  private lastFeed : number
  private lastFood : WatchdogFood<T>

  constructor(
    public name = 'Bark',
    public defaultTimeout = 60 * 1000,
  ) {
    super()
    log.verbose('Watchdog', '%s: constructor(name=%s, defaultTimeout=%d)', name, name, defaultTimeout)
  }

  public on(event: 'feed',  listener: WatchdogListener) : this
  public on(event: 'reset', listener: WatchdogListener) : this
  public on(event: 'sleep', listener: WatchdogListener) : this
  public on(event: never,   listener: never)            : never

  public on(event: WatchdogEvent, listener: WatchdogListener): this {
    log.verbose('Watchdog', '%s: on(%s, listener) registered.', this.name, event)
    super.on(event, listener)
    return this
  }

  private startTimer(timeout: number): void {
    log.verbose('Watchdog', '%s: startTimer()', this.name)

    if (this.timer) {
      throw new Error('timer already exist!')
    }

    this.timer = setTimeout(() => {
      log.verbose('Watchdog', '%s: startTimer() setTimeout() after %d', this.name, this.defaultTimeout)
      this.timer = undefined  // sleep after reset
      this.emit('reset',  this.lastFood, 0)
    }, timeout)

    this.timer.unref()  // should not block node quit

    return
  }

  private stopTimer(sleep = false): void {
    log.verbose('Watchdog', '%s: stopTimer()', this.name)

    if (typeof this.timer === 'undefined') {  // first time
      log.verbose('Watchdog', '%s: stopTimer() first run(or after sleep)', this.name)
      return
    }

    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    } else if (!sleep) {
      throw new Error('timer is already stoped!')
    }
  }

  public left(): number {
    let left
    if (Number.isInteger(this.lastFeed)) {
      // console.log('lastFeed=', this.lastFeed)
      // console.log('timeout=', this.lastFood.timeout)
      // console.log('Date.now()=', Date.now())
      left = this.lastFeed + this.defaultTimeout - Date.now()
      log.verbose('Watchdog', '%s: timerLeft() = %d', this.name, left)
    } else {
      left = 0
      log.verbose('Watchdog', '%s: timerLeft() first feed, left=%s', this.name, left)
    }
    return left
  }

  public feed(food: WatchdogFood<T>): number {
    log.verbose('Watchdog', '%s: feed(%s)', this.name, food)

    if (!food.timeout) {
      food.timeout = this.defaultTimeout
    }

    const left = this.left()

    this.stopTimer()
    this.startTimer(food.timeout)

    this.lastFeed = Date.now()
    this.lastFood = food

    this.emit('feed', food, left)

    return left
  }

  public sleep(): void {
    log.verbose('Watchdog', '%s: sleep()', this.name)
    this.stopTimer(true)
    this.timer = undefined
  }

}

export default Watchdog

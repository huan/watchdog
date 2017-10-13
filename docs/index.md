## Classes

<dl>
<dt><a href="#Watchdog">Watchdog</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#WatchdogEvent">WatchdogEvent</a></dt>
<dd><p>Watchdog Class Event Type</p>
</dd>
<dt><a href="#WatchdogListener<T,">WatchdogListener<T,</a></dt>
<dd><p>Watchdog Class Event Function</p>
</dd>
</dl>

<a name="Watchdog"></a>

## Watchdog
**Kind**: global class  

* [Watchdog](#Watchdog)
    * [new Watchdog()](#new_Watchdog_new)
    * [.on(event, listener)](#Watchdog+on) ⇒ <code>this</code>
    * [.left()](#Watchdog+left) ⇒ <code>number</code>
    * [.feed(food)](#Watchdog+feed) ⇒ <code>number</code>
    * [.sleep()](#Watchdog+sleep)

<a name="new_Watchdog_new"></a>

### new Watchdog()
A Timer used to detect and recover from malfunctions

**Example**  
```js
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
<a name="Watchdog+on"></a>

### watchdog.on(event, listener) ⇒ <code>this</code>
**Kind**: instance method of [<code>Watchdog</code>](#Watchdog)  

| Param | Type |
| --- | --- |
| event | [<code>WatchdogEvent</code>](#WatchdogEvent) | 
| listener | <code>WatchdogListener.&lt;T, D&gt;</code> | 

**Example** *(Event:reset )*  
```js
dog.on('reset', () => console.log('reset-ed'))
```
**Example** *(Event:feed )*  
```js
dog.on('feed',  () => console.log('feed-ed'))
```
**Example** *(Event:sleep )*  
```js
dog.on('sleep',  () => console.log('sleep-ed'))
```
<a name="Watchdog+left"></a>

### watchdog.left() ⇒ <code>number</code>
Get the left time

**Kind**: instance method of [<code>Watchdog</code>](#Watchdog)  
<a name="Watchdog+feed"></a>

### watchdog.feed(food) ⇒ <code>number</code>
feed the dog

**Kind**: instance method of [<code>Watchdog</code>](#Watchdog)  

| Param | Type |
| --- | --- |
| food | <code>WatchdogFood.&lt;T, D&gt;</code> | 

**Example**  
```js
const food = {
  data:    'delicious',
  timeout: 1 * 1000,
}
const dog = new Watchdog()
dog.feed(food)
```
<a name="Watchdog+sleep"></a>

### watchdog.sleep()
Clear timer.

**Kind**: instance method of [<code>Watchdog</code>](#Watchdog)  
**Example**  
```js
const dog = new Watchdog()
dog.sleep()
```
<a name="WatchdogEvent"></a>

## WatchdogEvent
Watchdog Class Event Type

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| feed | <code>string</code> | Emit when feed the dog. |
| reset | <code>string</code> | Emit when timeout and reset. |
| sleep | <code>string</code> | Emit when timer is cleared out. |

<a name="WatchdogListener<T,"></a>

## WatchdogListener<T,
Watchdog Class Event Function

**Kind**: global typedef  
**Properties**

| Type | Description |
| --- | --- |
| <code>function</code> | (food: WatchdogFood<T, D>, left: number) => void |


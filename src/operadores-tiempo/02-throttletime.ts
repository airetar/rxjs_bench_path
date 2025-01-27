import { asyncScheduler, distinctUntilChanged, fromEvent, map, throttleTime } from "rxjs";

const click$ = fromEvent(document, 'click');

click$.pipe(
    throttleTime(3000)
)
//.subscribe(console.log);

const input = document.createElement('input');
document.querySelector('body').append(input);

const input$ = fromEvent(input, 'keyup');

input$.pipe(
    throttleTime(1000, asyncScheduler, {
        leading: true,
        trailing: true
    }),
    map(event => event.target['value']),
    distinctUntilChanged()
).subscribe(console.log);
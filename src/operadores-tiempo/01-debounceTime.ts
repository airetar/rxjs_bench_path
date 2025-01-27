import { debounceTime, distinctUntilChanged, fromEvent, map } from "rxjs";

const click$ = fromEvent(document, 'click');

click$.pipe(
    debounceTime(3000)
)
.subscribe(console.log);

const input = document.createElement('input');
document.querySelector('body').append(input);

const input$ = fromEvent(input, 'keyup');

input$.pipe(
    debounceTime(600),
    map(event => event.target['value']),
    distinctUntilChanged()
).subscribe(console.log);
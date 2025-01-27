import { distinctUntilChanged, fromEvent, map, sample, sampleTime } from "rxjs";

const click$ = fromEvent<MouseEvent>(document, 'click');

click$.pipe(
    sampleTime(2000),
    map(({x, y}) => ({x, y}))
)
.subscribe(console.log);

const input = document.createElement('input');
document.querySelector('body').append(input);

const input$ = fromEvent(input, 'keyup');
input$.pipe(
    sampleTime(2000),
    map(event => event.target['value']),
    distinctUntilChanged()
).subscribe(console.log);
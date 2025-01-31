import { concatMap, exhaustMap, fromEvent, interval, take } from "rxjs";

const interval$ = interval(500).pipe(take(3));

const click$ = fromEvent(document, 'click');

click$.pipe(
    //concatMap(() => interval$)
    exhaustMap(() => interval$)
)
.subscribe(console.log);
import { fromEvent, interval, map, mergeMap, of, take, takeUntil } from "rxjs";

const letras$ = of('a', 'b', 'c');

letras$.pipe(
    mergeMap( (letra) => interval(1000).pipe(
        map(i => letra+i),
        take(3)
    ))
)
/* .subscribe(
    {
        next: (next) => console.log('Next: ', next),
        complete: () => console.log('Complete')
    }
); */

const mouseDown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');
const interval$ = interval(1000);

mouseDown$.pipe(
    mergeMap(() => interval$.pipe(
        takeUntil(mouseup$)
    ))
)
.subscribe(sec => console.log(sec + 1));
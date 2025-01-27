import { auditTime, fromEvent, map, tap } from "rxjs";

const click$ = fromEvent<MouseEvent>(document, 'click');

click$.pipe(
    map(({x}) => ({x})),
    tap(x => console.log('tap: ', x)),
    auditTime(2000)
)
.subscribe(console.log);

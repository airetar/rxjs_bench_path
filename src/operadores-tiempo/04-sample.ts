import { fromEvent, interval, sample } from "rxjs";

const click$ = fromEvent(document, 'click');

interval(4000).pipe(
    sample(click$)
).subscribe(console.log);
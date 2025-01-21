import { fromEvent } from "rxjs";
import { map, takeWhile, tap } from "rxjs/operators";

const click$ = fromEvent<MouseEvent>( document, 'click' );

click$.pipe(
    map(({ x, y }) => ({ x, y })),
    //takeWhile(({ y }) => y <= 150)
    takeWhile(({ y }) => y <= 150, true) // 2° param "inclusive" receive the value which observable is was terminated
)
.subscribe({
    next: val => console.log('next: ', val),
    complete: () =>  console.log('Complete')
});
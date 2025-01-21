import { fromEvent } from "rxjs";
import { take, first, map, tap } from "rxjs/operators";

const click$ = fromEvent<MouseEvent>( document, 'click' );

click$.pipe(
    tap<MouseEvent>(event => console.log('Tap: ', event)),
    map(({ clientX, clientY }) => ({
        clientX, 
        clientY
    })),
    first(event => event.clientY >= 150)
)
.subscribe({
    next: val => console.log('next: ', val),
    complete: () =>  console.log('Complete')
});
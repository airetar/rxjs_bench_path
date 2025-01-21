import { fromEvent, interval } from "rxjs";
import { skip, takeUntil, tap } from 'rxjs/operators'

const button = document.createElement('button');
button.innerHTML = 'Detener Timer';

document.querySelector('body').append(button);

const counter$ = interval(1000);
const clickBtn$ = fromEvent(button, 'click').pipe(
    tap(() => console.log( 'Tap antes de skip' )),
    skip(1),
    tap(() => console.log( 'Tap después de skip' )),
);

counter$.pipe(
    takeUntil( clickBtn$ )
)
.subscribe({
    next: val => console.log('Next: ', val),
    complete: () => console.log('Complete')
})
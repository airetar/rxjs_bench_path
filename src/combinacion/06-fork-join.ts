import { delay, forkJoin, interval, of, take } from "rxjs";

const numeros$ = of(1,2,3,4);
const interval$ = interval(1000).pipe(take(3));
const letras$    = of('a', 'b', 'c').pipe(delay(3500));

forkJoin([
    numeros$,
    interval$,
    letras$
]).subscribe(console.log);

forkJoin([
    numeros$,
    interval$,
    letras$
]).subscribe(([numeros, intervalos, letras]) => {
    console.log('numeros: ', numeros);
    console.log('intérvalo: ', intervalos);
    console.log('letras: ', letras);
});
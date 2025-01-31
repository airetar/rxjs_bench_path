import { of, startWith } from "rxjs";

const numeros$ = of(1,2,3).pipe(
    startWith(0)
);

numeros$.subscribe(console.log);
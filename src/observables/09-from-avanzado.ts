import { of, from } from 'rxjs';

/**
 * of = toma argumentos y genera una secuencia
 * from = array, promise, iterable, observable
 */

const observer = {
    next: val => console.log('next: ', val),
    complete: () => console.log('Complete')
};


/** Mismo resultado */
// const source$ = from([1,2,3,4,5]);
// const source$ = of(...[1,2,3,4,5]);
/**
 * sin el operador spread, mandaría una sola emisión devolviendo el arreglo
 */
//const source$ = of([1,2,3,4,5]);

const miGenerador = function*() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
};

const miIterable = miGenerador();

/* for (let id of miIterable) {
    console.log(id);
} */

from(miIterable).subscribe(observer);

/** Ejemplo con promesas */
const source$ = from(fetch('https://api.github.com/users/klerith'));

source$.subscribe(async resp => {
    const data = await resp.json();
    console.log(data.body);
});




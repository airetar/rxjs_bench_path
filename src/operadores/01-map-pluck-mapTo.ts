import { fromEvent, range } from 'rxjs';
import { map, mapTo, pluck } from 'rxjs/operators';

/**
 * * +++++++++++++++++ operador map +++++++++++++++++
 */

/**
    range(1, 5).pipe(
        map<number, number>( val => val * 10 )
    )
    .subscribe(console.log);
 */

/**

 */

const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup');

keyup$.subscribe(event => console.log('keyup$: ', event.code));

const keyupCode$ = keyup$.pipe(
    map(event => event.code)
);
/**
 * ! +++++++++++++++++ Operador pluck: deprecated +++++++++++++++++
 */
const keyupPluck$ = keyup$.pipe(
    // pluck('key')
    pluck('target', 'baseURI') // * Obtiene el valor de la propiedad target.baseURI
);

/**
 * ! +++++++++++++++++ Operador mapTo: deprecated +++++++++++++++++
 */

const keyupMapTo$ = keyup$.pipe(
    mapTo('Tecla presionada')
);

keyupCode$.subscribe(code => console.log('keyupCode$', code));
keyupPluck$.subscribe(code => console.log('keyupPluck$', code));
keyupMapTo$.subscribe(code => console.log('keyupMapTo$', code));



import { from } from "rxjs";
import { reduce, scan, map } from 'rxjs/operators'
const numeros = [1,2,3,4,5];

/* 
const acumulador = (acc, cur) => {
    return acc + cur;
} 
*/

const acumulador = (acc, cur) => acc + cur;


// * Reduce
from ( numeros ).pipe(
    reduce(acumulador, 0)
)
.subscribe( console.log );

// * Scan

from ( numeros ).pipe(
    scan(acumulador, 0)
)
.subscribe( console.log );

// * Redux

interface User {
    id?: string,
    autenticado?: boolean,
    token?: string,
    edad?: number
};

const users: User[] = [
    { id: 'ireta', autenticado: false, token: null },
    { id: 'ireta', autenticado: true, token: '123' },
    { id: 'ireta', autenticado: false, token: '123abc' },
    { id: 'ireta', autenticado: true, token: '123abc.' },
];

const state$ = from(users).pipe(
    scan<User, User>( (acc: User, cur: User) => {
        return { ...acc, ...cur }
    }, { edad: 20 } as User )
);

const id$ = state$.pipe(
    map( state => state )
);

id$.subscribe(console.log);
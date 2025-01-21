import { from, of } from "rxjs";
import { distinctUntilChanged } from 'rxjs/operators'

const numeros$ = of(1,1,2,'2',3,3,4,4,5,6,7,8,1,'2');
numeros$.pipe(
    distinctUntilChanged() // ===
)
.subscribe(console.log);

interface Personaje {
    nombre: string;
}

const personajes: Personaje[] = [
    { nombre: 'X' },
    { nombre: 'Megaman' },
    { nombre: 'Zero' },
    { nombre: 'Willy' },
    { nombre: 'Sonic' },
    { nombre: 'Megaman' },
    { nombre: 'X' },
    { nombre: 'Mickey' },
    { nombre: 'Mickey' },
];

from(personajes).pipe(
    distinctUntilChanged((prev, cur) => prev.nombre === cur.nombre)
)
.subscribe(console.log)

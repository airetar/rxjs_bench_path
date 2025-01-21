import { from, of } from "rxjs";
import { distinctUntilKeyChanged } from 'rxjs/operators'

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
    distinctUntilKeyChanged('nombre')
)
.subscribe(console.log)

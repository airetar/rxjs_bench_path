import { catchError, map, of } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';

const url = 'https://api.github.com/users?per_page=5';

const manejaErrores = (resp: Response) => {
    if (!resp.ok) {
        throw new Error(resp.statusText);
    }
    return resp;
}

/* 
const fetchPromesa = fetch( url );

fetchPromesa
    .then( manejaErrores )
    .then( resp => resp.json() )
    .then( data => console.log( data ) )
    .catch( err => console.warn('Error en usuarios: ', err) ); 
    */

const atrapaError = (err: AjaxError) => {
    console.warn('Error en: ', err.message);
    return of([]);
}

ajax(url).pipe(
    map(resp => resp.response),
    catchError(atrapaError)
).subscribe(users => console.log('usuarios: ', users));




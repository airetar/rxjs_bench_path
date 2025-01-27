import { catchError, of } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';

const url = 'https://httpxbin.org/delay/1';
//const url = 'https://api.github.com/users?per_page=5';

const manejaError = (err: AjaxError) => {
    console.warn('error: ', err.message);
    return of({
        ok: false,
        usuarios: []
    })
}

/* 
const obsJson$ = ajax.getJSON(url).pipe(
    catchError(manejaError)
);

const obsAjax$ = ajax(url).pipe(
    catchError(manejaError)
); 


obsJson$.subscribe(data => console.log('JSON: ', data));
obsAjax$.subscribe(data => console.log('AJAX: ', data));
*/

/**
 * * Atrapar errores con catchError antes de que llegue a error en el observer
*/

const obsJson$ = ajax.getJSON(url);
const obsAjax$ = ajax(url);


//obsAjax$.subscribe(data => console.log('AJAX: ', data));
obsJson$.pipe(
    catchError(manejaError) // en caso de no estár, el observer ejecutaría "error", de lo contrario catch retorna [] y el observer entra al Next
).subscribe({
    next: val => console.log('JSON next: ', val),
    error: err => console.warn('error en subs: ', err),
    complete: () => console.log('complete')
});


import { catchError, exhaustMap, fromEvent, map, mergeMap, of, switchMap, tap } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";

/**
 * Helper
 */

const httpLoginRequest$ = (userPass) => {
    return ajax.post('https://reqres.in/api/login?delay=1', userPass).pipe(
        map(ajaxResponse => ajaxResponse.response['token']),
        catchError(err => of('Error'))
    )
}

/**
 * creando formulario
 */

const form = document.createElement('form');
const inputEmail = document.createElement('input');
const inputPass = document.createElement('input');
const submitButton = document.createElement('button');

/** 
 * configuraciones
 */

inputEmail.type = 'email';
inputEmail.placeholder = 'Email';
inputEmail.value = 'eve.holt@reqres.in';

inputPass.type = 'password';
inputPass.placeholder = 'Password';
inputPass.value = 'cityslicka';

submitButton.innerHTML = 'Ingresar';

form.append( inputEmail, inputPass, submitButton );

document.querySelector('body').append(form);

/**
 * Streams
 */

const submitForm$ = fromEvent(form, 'submit').pipe(
    tap(ev => ev.preventDefault()),
    map(ev => ({
        email: ev.target[0].value,
        password: ev.target[1].value
    })),
    //mergeMap(httpLoginRequest$)
    //switchMap(httpLoginRequest$)
    exhaustMap(httpLoginRequest$)
);

submitForm$.subscribe(token => {
    console.log(token);
});
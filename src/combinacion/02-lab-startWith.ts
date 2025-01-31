import { startWith } from "rxjs";
import { ajax } from "rxjs/ajax";

const loadingDiv = document.createElement('div');
loadingDiv.classList.add('loading');
loadingDiv.innerHTML = 'Cargando...';

const body = document.querySelector('body');

// stream

ajax.getJSON('https://reqres.in/api/users/2?delay=2').pipe(
    startWith(true)
).subscribe(resp => {
    if (resp === true) {
        body.append(loadingDiv);
    } else {
        document.querySelector('.loading').remove()
    }
});
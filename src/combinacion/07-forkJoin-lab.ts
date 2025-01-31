import { catchError, forkJoin, of } from "rxjs";
import { ajax } from "rxjs/ajax";

const GITHUB_API_URL = 'https://api.github.com/users';
const GITHUB_USER    = 'airetar';

forkJoin(
    [
        ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
        ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/reposss`)
            .pipe(catchError(err => of([]))), // podemos manejar errores independientes para que todos los demás se puedan completar aunque uno falle
        ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`),
    ]
)
.pipe(
    catchError(err => of(err))
)
.subscribe(([usuario, repos, gists]) => {
    console.log('usuario: ', usuario);
    console.log('repos: ', repos);
    console.log('gists: ', gists);
});
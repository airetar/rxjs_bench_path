import { debounceTime, fromEvent, map, mergeAll, mergeMap, Observable, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { GithubUser } from "../interfaces/github-user";
import { GitHubUsers } from "../interfaces/github-users";

const orderList = document.createElement('ol');
const input = document.createElement('input');
const body = document.querySelector('body');
body.append(input, orderList);

const mostrarUsuarios = (usuarios: GithubUser[]) => {
    orderList.innerHTML = ``;
    for ( const usuario of usuarios ) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = usuario.avatar_url;
        const anchor = document.createElement('a');
        anchor.href = usuario.html_url;
        anchor.text = 'Ver página';
        anchor.target = '_blank';
        li.append( img );
        li.append( usuario.login + ' ' );
        li.append( anchor );

        orderList.append(li);
    }
}

const input$ = fromEvent<KeyboardEvent>(input, 'keyup');

input$.pipe(
        debounceTime<KeyboardEvent>(600),
        map<KeyboardEvent, Observable<GitHubUsers>>(event => {
            const texto = event.target['value'];
            return ajax.getJSON(`https://api.github.com/search/users?q=${texto}`);
        }),
        mergeAll<Observable<GitHubUsers>>(),
        map<GitHubUsers, GithubUser[]>(data => data['items'])
    )
    //.subscribe(mostrarUsuarios);

    const url = 'https://httpbin.org/delay/1?arg=';

    input$.pipe(
        map(event => event.target['value']),
        switchMap(texto => ajax.getJSON(url + texto))
    )
    .subscribe(console.log)
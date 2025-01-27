import { ajax } from 'rxjs/ajax'

const url = 'https://httpbin.org/delay/1';

/**
ajax.post(url, {
    id: 1,
    nombre: 'Andrés'
}, {
    'mi-token': 'abc123'
}).subscribe(console.log);
 */

ajax({
    url,
    method: 'PUT',
    headers: {
        'mi-token': 'abcd1234'
    },
    body: {
        id: 1,
        nombre: 'Andrés'
    }
}).subscribe(console.log);
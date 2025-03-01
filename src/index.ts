import { ajax } from 'rxjs/ajax';
import { switchMap, map, concatMap } from 'rxjs/operators';
import { zip, of, pipe } from 'rxjs';

/**
 * Ejercicio: 
 *  Realizar 2 peticiones HTTP (ajax) una después de otra.
 *  
 *  La primera debe de obtener el personaje de Star Wars:
 *   Luke Skywalker, llamando el endpoint:   /people/1/
 * 
 *  La segunda petición, debe de ser utilizando el objeto
 *  de la petición anterior, y tomar la especie (species),
 *  que es un arreglo de URLs (array), dentro de ese arreglo, 
 *  tomar la primera posición y realizar la llamada a ese URL,
 *  el cual debería de traer información sobre su especie (Human)
 */

// Respuesta esperada:
// Información sobre los humanos en el universo de Star Wars
// Ejemplo de la data esperada
/*
 { name: "Human", classification: "mammal", designation: "sentient", average_height: "180", skin_colors: "caucasian, black, asian, hispanic", …}
*/

// Respuesta esperada con Mayor dificultad
// Retornar el siguiente objeto con la información de ambas peticiones
// Recordando que se disparan una después de la otra, 
// con el URL que viene dentro del arreglo de 'species'

// Tip: investigar sobre la función zip: 
//      Que permite combinar observables en un arreglo de valores
// https://rxjs-dev.firebaseapp.com/api/index/function/zip

// Ejemplo de la data esperada:
/*
    especie: {name: "Human", classification: "mammal", designation: "sentient", average_height: "180", skin_colors: "caucasian, black, asian, hispanic", …}
    personaje: {name: "Luke Skywalker", height: "172", mass: "77", hair_color: "blond", skin_color: "fair", …}
*/


/**
 * * V 1.1
 */

(() =>{
    console.log('============== V1.1 ==============');
    // No tocar ========================================================
    const SW_API = 'https://swapi.dev/api';                     
    const getRequest = ( url: string ) => ajax.getJSON<any>(url);
    // ==================================================================

    // Realizar el llamado al URL para obtener a Luke Skywalker
    const personaje$ = getRequest(`${SW_API}/people/2`);
    const especie$ =  personaje$.pipe(
        // Realizar los operadores respectivos aquí
        switchMap(firstResponse => {
            if (firstResponse.species?.length) {
                return ajax.getJSON(firstResponse.species[0])
            }
    }));

    zip(personaje$, especie$).pipe(map(([personaje, especie]) => ({ personaje, especie })))
    // NO TOCAR el subscribe ni modificarlo ==
    .subscribe( console.log )           // ==
    // =======================================
})();

/**
 * * V 1.2
 */

(() =>{
    // No tocar ========================================================
    const SW_API = 'https://swapi.dev/api';                     
    const getRequest = ( url: string ) => ajax.getJSON<any>(url);
    // ==================================================================

    // Realizar el llamado al URL para obtener a Luke Skywalker
    getRequest(`${SW_API}/people/2`).pipe(
        switchMap(response => zip(of(response), getRequest(response.species[0]))),
        map(([personaje, especie]) => ({personaje, especie}))
    // NO TOCAR el subscribe ni modificarlo ==
    ).subscribe( console.log )           // ==
    // =======================================



})();

        

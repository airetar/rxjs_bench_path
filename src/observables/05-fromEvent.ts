import { of } from 'rxjs';

const obs$ = of(1,2,3,4,5,6);
/* Podemos enviar cualquier tipo de data */
// const obs2$ = of([1,2,3,4,5,6], {a: 1, b: 2}, function(){}, Promise.resolve(true));

obs$.subscribe(
  next => console.log('next: ', next),
  null,
  () => console.log('Terminamos la secuencia')
);

console.log('Fin del obs$');

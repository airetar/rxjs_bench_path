import { Observable, Observer } from "rxjs";

const observer: Observer<any> = {
  next: (next) => console.log("next: ", next),
  error: (error) => console.warn("error: ", error),
  complete: () => console.info("Completed"),
};

// otra forma de crear un Observable
// const obs$ = Observable.create();
const obs$ = new Observable((subs) => {
  subs.next("Hola");
  subs.next("Mundo");

  subs.next("Hola");
  subs.next("Mundo");

  /* const a = undefined;
    a.nombre = 'andres'; */

  subs.complete();

  subs.next("Hola");
  subs.next("Mundo");
});

obs$.subscribe(observer);

/* obs$.subscribe(
    next => console.log('next'),
    error => console.warn('error'),
    () => console.log('completado')
); */

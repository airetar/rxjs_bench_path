import { Observable, Observer, Subject } from "rxjs";

const observer: Observer<any> = {
  next: (next) => console.log("next: ", next),
  error: (error) => console.warn("error: ", error),
  complete: () => console.info("Complete"),
};

const intervalo$ = new Observable<number>((subs) => {
  const intervalID = setInterval(() => subs.next(Math.random()), 1000);

  return () => {
    clearInterval(intervalID);
    console.log('Intervalo destruido');
  }
});

/** !!!! IMPORTANTE !!!
 * 1- Casteo Múltiple (enviamos el mismo valor a varios subscribers)
 * 2- También es un observer
 * 3- Next, error y complete
 */
const subject$ = new Subject();

// se debe ligar el subscribe a algún lado para eventualmente poder "completarlo | unsubscribe" y que se ejecute el return
const intervalSubscription = intervalo$.subscribe(subject$);

/* 
 * * Obtenemos números distintos en cada subscripcion (para mandar el mismo a todos, se utiliza un subject)
const subs1 = intervalo$.subscribe( rnd => console.log('subs1: ', rnd));
const subs2 = intervalo$.subscribe( rnd => console.log('subs2: ', rnd));
*/

/*
 * * Ejemplo con los mismos valores
const subs1 = subject$.subscribe((rnd) => console.log("subs1: ", rnd));
const subs2 = subject$.subscribe((rnd) => console.log("subs2: ", rnd));
*/

const sub1 = subject$.subscribe( observer );
const sub2 = subject$.subscribe( observer );

setTimeout(() => {

  subject$.next(10);
  subject$.complete();

  intervalSubscription.unsubscribe();
}, 3500);

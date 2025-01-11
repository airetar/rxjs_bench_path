import { Observable, Observer, Subscription } from "rxjs";

const observer: Observer<any> = {
  next: (next) => console.log("next: ", next),
  error: (error) => console.warn("error: ", error),
  complete: () => console.info("Complete"),
};

const intervalo$ = new Observable<number>((subscriber) => {
  let num = 0;

  const interval = setInterval(() => {
    console.log(num);
    subscriber.next(num++);
  }, 1000);

  setTimeout(() => {
    observer.complete();
  }, 2500);
  // 6500

  // cada observable ejecuta un "return" al ser completado, en donde pueden ejecutarse instrucciones de limpieza
  return () => {
    clearInterval(interval);
    console.log("Intérvalo destruido");
  };
});

const subscription1 = intervalo$.subscribe(observer);
const subscriptions: Subscription[] = [
  intervalo$.subscribe(observer),
  intervalo$.subscribe(observer),
];

/** Sirve para terminar todos los observables al mismo tiempo */
subscriptions.forEach((sub) => subscription1.add(sub));

setTimeout(() => {
  subscription1.unsubscribe();
  /* subscription1.unsubscribe();
    subscription2.unsubscribe();
    subscription3.unsubscribe(); */

  console.log("completado");
}, 3000);

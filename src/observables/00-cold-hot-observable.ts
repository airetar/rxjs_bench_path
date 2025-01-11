
import { Observable, Subject, takeUntil } from 'rxjs';

/**
 * Ejemplo que no es del curso !!!
 */
const subjectDestroy = new Subject();

// Crear un cold observable
const coldObservable = new Observable<number>(subscriber => {
    console.log('Creando productor...');
    let count = 1;
    const intervalId = setInterval(() => {
        subscriber.next(count++);
    }, 1000);

    // Limpieza
    return () => {
        clearInterval(intervalId);
        console.log('Productor detenido.');
    };
});

// Suscribirse al cold observable
const subscription1 = coldObservable.pipe(takeUntil(subjectDestroy)).subscribe(value => {
    console.log(`Suscriptor 1: ${value}`);
});

setTimeout(() => {
    const subscription2 = coldObservable.pipe(takeUntil(subjectDestroy)).subscribe(value => {
        console.log(`Suscriptor 2: ${value}`);
    });
}, 3000); // Suscriptor 2 se suscribe después de 3 segundos

setTimeout(() => {
    subjectDestroy.next(null);
    subjectDestroy.complete();
}, 10000);


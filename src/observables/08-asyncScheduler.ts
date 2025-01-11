import { asyncScheduler } from 'rxjs';

// setTimeout(() => { }, 1000);
// setInterval(() => { }, 1000);

const saludar = () => console.log('Hola Mundo');
const saludar2 = nombre => console.log(`Hola ${nombre}`);
const saludar3 = data => console.log(`Hola ${data.nombre} ${data.apellido}`);

//asyncScheduler.schedule(saludar, 2000);
/** 
 *  Tercer parámetro es el state, si la funcion recibe parámetros puede recibirlos de esta manera, ya que si se llama a saludar2(param),
 *  se ejecutaría inmediatamente. Solo se puede enviar "un parametro", o en su defecto si se necesitaran 2 o más, se manda como objecto
 *  
 *  asyncScheduler.schedule(saludar2, 2000, 'Andrés');
 *  asyncScheduler.schedule(saludar3, 2000, {nombre: 'Andrés', apellido: 'Ireta'});
 */
/** La funcion no puede ser una función de flecha para el comportamiento de setInterval */
const subs = asyncScheduler.schedule( function(state) {
    console.log('state', state);
    this.schedule(state + 1, 1000); // aquí se vuelve a llamar, convirtiéndolo en setInterval
}, 3000, 0);

/* setTimeout(() => {
    subs.unsubscribe(); // detiene todo
}, 6000); */

asyncScheduler.schedule(() => subs.unsubscribe(), 6000);

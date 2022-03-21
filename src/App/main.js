import { initFirebase } from '../lib/firebase.js';
import { initRouter } from './router.js';


const init = () => {
  const {autenticacion, db} = initFirebase();
  initRouter(autenticacion, db);
};

window.addEventListener('load', init());

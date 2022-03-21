import { logOut, post, getPost } from "../../lib/homeFirebase.js";


export const home = (autenticacion, db) => {

  const homeCont = document.createElement('div');
  homeCont.className = 'homeCont';

  const homeHead = document.createElement('div');
  homeHead.className = 'homeHead';
  homeCont.appendChild(homeHead);

  const homeLogo = document.createElement('div');
  homeLogo.className = 'logo';
  homeLogo.textContent = 'Kitter';
  homeHead.appendChild(homeLogo);

  const homeLogout = document.createElement('button');
  homeLogout.className = 'logout';
  homeHead.appendChild(homeLogout);
  homeLogout.addEventListener('click', (e) => {
    e.preventDefault();
    logOut(autenticacion)
    window.location.hash = '#/login';
  });

  const contPost = document.createElement ('div');
  contPost.className = 'contPost';
  homeCont.appendChild(contPost);

  const userProfile = document.createElement('div');
  userProfile.className = 'userProfile';
  contPost.appendChild(userProfile);

  const textPost = document.createElement('textarea');
  textPost.className = 'post';
  textPost.id = 'post'
  textPost.placeholder = 'Escribe tu publicación'
  contPost.appendChild(textPost);

  const arrowPost = document.createElement('button');
  arrowPost.className = 'arrowPost';
  arrowPost.id = 'arrowPost';
  contPost.appendChild(arrowPost);
  arrowPost.addEventListener('click', async (e) => {
    e.preventDefault()
    await post(db, autenticacion)
  });
  arrowPost.addEventListener('click', (e) =>{
    e.preventDefault();
    textPost.value = '';
  })

  const editButton = document.createElement('button');
  editButton.id = 'editButton';
  editButton.textContent = 'Guardar cambios'
  contPost.appendChild(editButton); 

  const contentPost = document.createElement('div');
  contentPost.className = 'contentPost';
  contentPost.id = 'contentPost'
  homeCont.appendChild(contentPost);

  // const deletePost = document.getElementsByClassName('deletePost');
  // deletePost.addEventListener('click', async (e) => {
  //   e.preventDefault()
  //   await eliminarPost(db)
  // });

  getPost(db, autenticacion);
  // const anuncio = document.createElement('div');
  // anuncio.className = 'anuncio';
  // contPost.appendChild(anuncio);

  // const avisoTexto = document.createElement('p');
  // avisoTexto.className = 'avisoTexto';
  // avisoTexto.textContent = 'Pagina en construcción';
  // anuncio.appendChild(avisoTexto);

  // const aviso = document.createElement('img');
  // aviso.className = 'aviso';
  // aviso.src = './assets/img/working-pusheen.gif';
  // anuncio.appendChild(aviso);


  return homeCont;

};

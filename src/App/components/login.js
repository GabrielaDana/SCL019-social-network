import { loginGoogleAuth } from '../../lib/logFirebase.js';
import { login } from '../../lib/logFirebase.js';
import { emptyInputLog } from '../helpers/validate.js';
import { showPassword3 } from '../helpers/showPassword.js';

export const ingresar = (autenticacion) => {
  const content = document.createElement('div');
  content.className = 'content';

  const logo = document.createElement('div');
  logo.className = 'logo';
  logo.textContent = 'Kitter';
  content.appendChild(logo);

  const box = document.createElement('div');
  box.className = 'box';
  content.appendChild(box);

  const boxTitle = document.createElement('div');
  boxTitle.className = 'boxTitle';
  box.appendChild(boxTitle);

  const title = document.createElement('p');
  title.className = 'title';
  title.textContent = 'Iniciar sesión en Kitter';
  boxTitle.appendChild(title);

  const formLog = document.createElement('form');
  formLog.className = 'form';
  box.appendChild(formLog);

  const email = document.createElement('input');
  email.className = 'input3';
  email.id = 'emailLogin';
  email.placeholder = 'Correo electrónico';
  formLog.appendChild(email);

  const password = document.createElement('input');
  password.className = 'input4';
  password.id = 'password';
  password.placeholder = 'Contraseña';
  password.type = 'password';
  password.maxLength = '6';
  formLog.appendChild(password);

  const warning = document.createElement('div');
  warning.id = 'warning';
  warning.className = 'warning';
  formLog.appendChild(warning);

  const eye2 = document.createElement('img');
  eye2.className = 'eye2';
  eye2.src = './assets/img/eye.png';
  formLog.appendChild(eye2);
  eye2.addEventListener('click', showPassword3);

  const btnLogin = document.createElement('button');
  btnLogin.className = 'btn';
  btnLogin.id = 'btnCrear';
  btnLogin.textContent = 'Ingresar';
  formLog.appendChild(btnLogin);


  btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    // const message = `<p class='campos'>Hay campos vacíos</p>`;
    const mail = email.value;
    const pass = password.value;
    const cat = `<img src = './assets/img/cryCat.png' class='cry'>`;
    const valid = emptyInputLog(mail, pass);
    if (valid === true) {
      warning.innerHTML = cat + 'Hay campos vacíos';
    }
  });

  btnLogin.addEventListener('click',(e) => login(e, autenticacion));

  const btnCreateAccount = document.createElement('a');
  btnCreateAccount.className = 'a';
  btnCreateAccount.textContent = 'Crear cuenta';
  btnCreateAccount.setAttribute('href', '#/formulario');
  formLog.appendChild(btnCreateAccount);

  const btnGoogle = document.createElement('button');
  btnGoogle.className = 'btn';
  btnGoogle.textContent = 'Ingresar con Google';
  formLog.appendChild(btnGoogle);
  btnGoogle.addEventListener('click', (e) => loginGoogleAuth(e, autenticacion));

  const googleIco = document.createElement('img');
  googleIco.className = 'icono';
  googleIco.src = './assets/img/google.png';
  btnGoogle.appendChild(googleIco);

  return content;
};

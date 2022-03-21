import {
  // getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';

const sendEmail = (autenticacion) => {
  sendEmailVerification(autenticacion.currentUser)
    .then(() => {
      console.log('Mail enviado');
      // ...
    });
};

export const register = (e, autenticacion) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // const pass = document.querySelector('.password').value
  const confPassword = document.getElementById('confPassword').value;
  console.log(email);
  console.log(password);

  if (email.length === 0) {
    return console.log('aquí para');
  };
  if (password !== confPassword) {
    return console.log('para aqui2');
  };

  createUserWithEmailAndPassword(autenticacion, email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      sendEmail(autenticacion);
      alert('Registro exitoso. Revisa tu correo para validar tu cuenta');
      window.location.hash='#/login';
    })
    .catch((error) => showRegErrors(error));
};

export const googleAuth = (e, autenticacion) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();
 

  signInWithPopup(autenticacion, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      window.location.hash='#/home';
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // console.log(errorCode, errorMessage, email, credential);
    });
};

const showRegErrors = (error) => {
  // const errorCode1 = validateReg;
  const errorCode = error.code;

  switch (errorCode) {
    case 'auth/invalid-email':
      warning.innerHTML = 'Correo inválido';
      break;
    case 'auth/email-already-in-use':
      warning.innerHTML = 'Este correo ya está asociado a una cuenta';
      break;
    case 'auth/weak-password':
      warning.innerHTML = 'La contraseña debe ser de 6 dígitos';
      break;
    default:
      warning.innerHTML = 'Hay campos vacios';
  }
};

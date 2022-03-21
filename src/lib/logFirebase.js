import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut} from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';


export const login = (e, autenticacion) => {
    e.preventDefault();

    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('password').value;
    console.log(email);
    console.log(password);

    if (email.length === 0 || password.length === 0) {
      return console.log('aquí para');
    };

    signInWithEmailAndPassword(autenticacion, email, password).then((userCredential) => { // Signed in
      const user = userCredential.user;
      console.log(user)
      if(user.emailVerified){
      console.log('entró');
      window.location.hash='#/home';
      }else{
         alert('Usuario no verificado');
         window.location.hash='#/login';
      }
    }).catch((error) => showLogErrors(error));
};

export const loginGoogleAuth = (e, autenticacion) => {
    e.preventDefault();
    console.log('holi')
    const provider = new GoogleAuthProvider();

    signInWithPopup(autenticacion, provider).then((result) => {
        console.log('pasó then')
        window.location.hash='#/home';
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    }).catch((error) => { // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        console.log(error.message)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // console.log(errorCode, errorMessage, email, credential);
    });
};

const showLogErrors = (error) => {
  // const errorCode1 = validateReg;
  const errorCode = error.code;

  switch (errorCode) {
    case 'auth/invalid-email':
      warning.innerHTML = 'Correo inválido';
      break;
    case 'auth/user-not-found':
      warning.innerHTML = 'Este correo no se encuentra registrado';
      break;
    case 'auth/wrong-password':
      warning.innerHTML = 'La contraseña es incorrecta';
      break;
    default:
      warning.innerHTML = 'Hay campos vacios';
  }
};

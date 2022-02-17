import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";


export const register = (e) => {
  e.preventDefault()
const username = document.getElementById('username').value;
const email = document.getElementById ('email').value;
const password = document.getElementById ('password').value;
const confPassword = document.getElementById ('confPassword').value;
console.log(email);
console.log(password);

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    
    const user = userCredential.user;
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // alert(errorMessage)
    console.log(error.code, error.message);
    // ..
  });

}
 
export const googleAuth = (e) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}



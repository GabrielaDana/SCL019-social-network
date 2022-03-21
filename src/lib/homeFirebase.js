import {signOut} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import {
    collection,
    addDoc,
    // getDocs,
    onSnapshot,
    // orderBy
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

export const logOut = (autenticacion) => {
    signOut(autenticacion).then(() => {
        console.log("Usuario cerró sesión");
    }).catch((error) => {
        console.log("no se pudo cerrar sesión");
    });
};

export const post = async (db, autenticacion) => {
    let publicar = document.getElementById("post").value;
    const user = autenticacion.currentUser;
    const email = user.email;
    if(publicar.length === 0){
        alert('Escribe algo para publicar')
    }
    try {
        const docRef = await addDoc(collection(db, "publicaciones"), {
            publicacion: publicar,
            email: email
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const eliminarPost = (db, id) => {
    console.log('Borrar');
    const result = confirm('Esta acción eliminará tu post de manera permanente, ¿Desea continuar?')
    if (result === true) {
        deleteDoc(doc(db, "publicaciones", id));
    }
}

export const getPost = (db, autenticacion, id) => {
    onSnapshot(collection(db, "publicaciones"), (querySnapshot) => {
        const cont = document.getElementById('contentPost');
        const user = autenticacion.currentUser;
        cont.innerHTML = '';

        querySnapshot.forEach((doc) => {
            console.log(`${
                doc.id
            } => ${
                doc.data().email
            }`)
            const id = doc.id;
            // cont.innerHTML +=
            const nameUser = document.createElement('div')
            nameUser.className = 'nameUser';
            nameUser.textContent = doc.data().email;
            cont.appendChild(nameUser);

            const posteo = document.createElement('div')
            posteo.className = 'posteo';
            posteo.textContent = doc.data().publicacion;
            cont.appendChild(posteo);

            const barra = document.createElement('div')
            barra.className = 'barra';
            cont.appendChild(barra);

            const like = document.createElement('div');
            like.className = 'like';
            barra.appendChild(like);

            if (doc.data().email === user.email) {
                const deletePost = document.createElement('button');
                deletePost.className = 'deletePost';
                deletePost.textContent = 'Borrar';
                barra.appendChild(deletePost);
                deletePost.addEventListener('click', (e) => {
                    e.preventDefault()
                    eliminarPost(db, id)
                });

                let dataPost = doc.data().publicacion;

                const editPost = document.createElement('button');
                editPost.className = 'editPost';
                editPost.textContent = 'Editar';
                barra.appendChild(editPost);
                editPost.addEventListener('click', (e) => {
                    e.preventDefault();
                    editarPost(db, id, dataPost);
                });
                editPost.addEventListener('click', (e) =>{
                    e.preventDefault();
                    document.getElementById('editButton').style.display = 'block';
                    document.getElementById('arrowPost').style.display = 'none';
                });
            }

        });
    })
};

const editarPost = (db, id, dataPost) => {

    const edit = document.getElementById('editButton');
    document.getElementById('post').value = dataPost;
    const editRef = doc(db, "publicaciones", id);

       edit.addEventListener('click', () => {
        let publicar = document.getElementById("post").value;
        updateDoc(editRef, {publicacion: publicar});
        let publicar1 = document.getElementById("post");
        publicar1.value = '';
        edit.style.display = 'none';
        document.getElementById('arrowPost').style.display = 'block';
       });
    
}



// para ordenar pero no funcinó
// orderBy('datePosted', 'desc')

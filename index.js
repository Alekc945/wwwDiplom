import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc,serverTimestamp
} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyDDF0isW2SKC3If-Aapi-X87zB5u1YfsiU",
  authDomain: "my-base-b89da.firebaseapp.com",
  projectId: "my-base-b89da",
  storageBucket: "my-base-b89da.firebasestorage.app",
  messagingSenderId: "1079098858635",
  appId: "1:1079098858635:web:98d6e0d989fd4d56ac488e"
};

 
initializeApp(firebaseConfig)


const db = getFirestore()

f
const colRef = collection(db, 'users')




  onSnapshot(colRef, (snapshot) => {
    let users = []
    snapshot.docs.forEach(doc => {
        users.push({ ...doc.data(), id: doc.id })
    })
    console.log(users)
  })


const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
if ( localStorage.getItem('cartItems') == "[]" )
{
    console.log("Нельяза сделать пустой заказ ")
    return;
}
else{
    addDoc(colRef, {
        name: addBookForm.name.value,
        nomber: addBookForm.email.value,
        cart:  localStorage.getItem('cartItems'),
        createdAt: serverTimestamp()
      })
      .then(() => {
        addBookForm.reset()
      })
}

})



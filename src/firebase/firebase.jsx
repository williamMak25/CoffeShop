import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth' 

const firebaseConfig = {
  apiKey: "AIzaSyCDKCfAGUy7Foxhd0U0MzLSIDETIvFdOGA",
  authDomain: "coffeeshopauth-fcdc2.firebaseapp.com",
  projectId: "coffeeshopauth-fcdc2",
  storageBucket: "coffeeshopauth-fcdc2.appspot.com",
  messagingSenderId: "79730676256",
  appId: "1:79730676256:web:61c97a9a2612dac410a245"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)


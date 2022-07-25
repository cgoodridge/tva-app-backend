import firebase from './firebaseConfig';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import { collection } from 'firebase/firestore';

export const signup = async ({ firstName, lastName, email, password }) => {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = response.user;
    await user.updateProfile({ displayName: `${firstName} ${lastName}` });
    return user;
}

export const firebaseLogout = () => {
    return firebase
        .auth()
        .signOut();
}

export const firebaseLogin = async (email, password) => {
    const resp = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    return resp.user;
}

export const database = firebase.firestore();
export const storage = firebase.storage();
export const authRef = firebase.auth();


export const userCollectionRef = collection(database, "users");

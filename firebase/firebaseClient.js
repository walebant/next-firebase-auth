import firebase from 'firebase';
import config from './config';

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

import firebase from 'firebase';
import { config } from './config';

const firebaseClient = () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp(config);
  }

  return firebase.app();
};

export default firebaseClient;

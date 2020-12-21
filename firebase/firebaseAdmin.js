import admin from 'firebase-admin';
import { config } from './config';
import serviceAccount from './secrets.json';

export default verifyIdToken = token => {
  if (!admin.app.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: config.databaseURL,
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(error => {
      throw error;
    });
};

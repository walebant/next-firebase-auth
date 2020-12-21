import { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import firebaseClient from '../firebase/firebaseClient';
import firebase from 'firebase';
import 'firebase/auth';
import { useRouter } from 'next/router';
import { isMobile } from '../utils/helpers';
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  firebaseClient();

  const router = useRouter();
  const toast = useToast();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      toast({
        title: 'Something went wrong ☹️',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error]);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async user => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', {});
        setIsLoading(false);
        router.replace('/login');
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      setIsLoading(false);
      nookies.set(undefined, 'token', token, {});
    });
  }, []);

  const login = (email, password) => {
    setError('');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(d => router.replace('/'))
      .catch(e => setError(e))
      .finally(() => setIsLoading(false));
  };

  const signup = (email, password) => {
    setError('');
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setTimeout(() => router.replace('/'), 4000);
      })
      .catch(e => setError(e))
      .finally(() => setIsLoading(false));
  };

  const logout = () => {
    setError('');
    firebase
      .auth()
      .signOut()
      .then(() => router.replace('/login'))
      .catch(e => {
        console.log(e);
        setError(e);
      })
      .finally(() => setIsLoading(false));
  };

  const loginInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const method = authProvider =>
      isMobile()
        ? firebase.auth().signInWithRedirect(authProvider)
        : firebase.auth().signInWithPopup(authProvider);

    method(provider)
      .then(result => {
        setUser(result.user);
        router.replace('/');
      })
      .catch(e => {
        console.log(e);
        setError(e);
      })
      .finally(() => setIsLoading(false));
  };

  const resetPassword = email => {
    setError('');
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        toast({
          title: 'Success 📌',
          description: 'Please check your inbox to continue',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(e => setError(e))
      .finally(() => setIsLoading(false));
  };

  const value = {
    user,
    login,
    loginInWithGoogle,
    signup,
    logout,
    resetPassword,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

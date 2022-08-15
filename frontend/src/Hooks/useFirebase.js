import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import InitializeFirebase from '../Firebase/Firebase.init';
InitializeFirebase()
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(true)
    const auth = getAuth();


    // const saveUser = (type, email, displayName) => {
    //     const user = { email, displayName}
    //     fetch('h***----***', {
    //         method: type,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(user),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //         })
    //         .catch (error) => {
    //         });
    // }

    const GoogleSignIn = (history, redirectLocation) => {
        setIsLoading(true)
        const GoogleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, GoogleProvider)
            .then(result => {
                const user = result.user;
                history.push(redirectLocation)
                // saveUser('PUT', user.email, user.displayName)
            })
            .finally(() => {
                setIsLoading(false);
            })

    }




    const Register = (email, password, text, history, location) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // setUser(user)
                updateProfile(auth.currentUser, {
                    displayName: text
                })
                history.push(location)
                // saveUser('POST', user.email, text)

            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const loginWithEmail = (email, password, history, location) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/'
                history.replace(destination)
                // const user = userCredential.user;
                history.push(location)
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    const LogOut = (history) => {

        setIsLoading(true)
        signOut(auth)
            .then(() => {
                setUser({})
                history.push('/Home')
            })
            .finally(() => {
                setIsLoading(false)

            })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)

            }
            else {
                setUser({})
            }
            setIsLoading(false)
        });
        return () => unsubscribe;
    }, [auth])

    return {
        Register,
        loginWithEmail,
        user,
        GoogleSignIn,
        LogOut,
        isLoading,
        error
    };

}

export default useFirebase;
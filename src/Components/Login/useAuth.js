import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase.config';
import React , { useState,createContext,useContext , useEffect} from 'react';
import {Route,Redirect} from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext()
export const AuthProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}> {props.children} </AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext);

export const  PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const getUser = user => {
  const { displayName, email, photoURL } = user
  return { name: displayName, email, photo: photoURL }
}
const Auth = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
             const currUser = user;
             setUser(currUser);
          }
        });
        
    },[])

    const signIn = (email,password) => {
        return firebase.auth().signInWithEmailAndPassword(email,password)
       .then(res => {
           setUser(res.user);
           window.history.back(); 
        })
    }

   

    const signUp = (email, password, name) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            firebase.auth().currentUser.updateProfile({
                displayName: name
            }).then(() => {
              setUser(res.user);
              window.history.back(); 
            });
            

        });
    }

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
      .then(res => {
        // console.log(res);
        const signedInUser = getUser(res.user)
        setUser(signedInUser)
        return res.user
      })
      .catch(err => {
        // console.log(err)
        setUser(null)
        return err.message
      });
  }

    const signOut = () => {
        return firebase.auth().signOut()
        .then(res => setUser(null))
    }
    return{
        user,
        signIn,
        signUp,
        signInWithGoogle,
        signOut
    }
}

export default Auth;
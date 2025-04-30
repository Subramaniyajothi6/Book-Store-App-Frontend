import {  useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";


const AuthContext = createContext();

export const useAuth = () =>{
return useContext(AuthContext)    
}
const googleProvider = new GoogleAuthProvider();

// authprovider
export const AuthProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const registerUser = async ({email, password}) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    // login user
    const loginUser = async (email,password) =>{
        
        return await signInWithEmailAndPassword(auth, email, password)
    }



    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider); 
    }



    // logout user
    const logout = () => {
        return signOut(auth); }

    // manger user
    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (user) => {
           setCurrentUser(user);
           setLoading(false);
           if(user){
            const {email,displayName,photoURL} = user;
            const userData = {
                email,username:displayName,photo:photoURL
            }
            console.log("User data:", userData);
           }
       }) 
       return () => unsubscribe()
    },[])
    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}
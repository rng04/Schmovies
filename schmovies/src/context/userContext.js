import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import toast from "react-hot-toast";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null)

    const signIn = (userData) => {
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    const signOut = async () => {
        try {
            // Optional: Call backend to invalidate the token
            await axios.post("/logout", { credentials: "include" });
    
            // Clear localStorage and context
            setUser(null);
            localStorage.removeItem("user");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    const updateMovie = async (isFavorite, movieId) => {
        try {
            const response = await axios.put("/api/movies/update", {
                id:user._id,
                movieId:movieId,
                isFavorite:isFavorite
            })

            if(!response.data.active) {
                toast.success(isFavorite ? "You have unfavorited the movie!" : "You have unbookmarked the movie!")
            } else {
                toast.success(isFavorite ? "You have favorited the movie!" : "You have bookmarked the movie!")
            }
        } catch(error) {
            if(!user) {
                isFavorite ? 
                toast.error("Must sign in to favorite") :
                toast.error("Must sign in to bookmark")
            } else {    
                toast.error("Error")
            }
        }
    }

    const containsMovie = async (type, movieId) => {
        try {
            const response = await axios.get(`/api/movies/contains?id=${user._id}&movieId=${movieId}&type=${type}`)
            return type === "favorites" ? response.data.favorites : response.data.bookmarks
        } catch(error) {
            if(!user) {
               toast.error("SIKE!")
            } else {     
                toast.error("Error finding movie")
            }
        }
    }
    
    useEffect(()=>{
        if(user !== null) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        } else {
            setUser(null)
        }
    },[])

    return (
        <UserContext.Provider value={{user,setUser,signIn,signOut,updateMovie,containsMovie}}>
            {children}
        </UserContext.Provider>
    )
}
import missingImage from "./noimage.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";
import ReviewInput from "../reviews/ReviewInput";

export default function MovieCard({movie}) {
    const { Title, Poster, Year, imdbID } = movie
    const {user, updateMovie, containsMovie} = useContext(UserContext)
    const [heartActive, setHeartActive] = useState(false)
    const [bookmarkActive, setBookmarkActive] = useState(false)
 
    async function futureToggle(isFavorite, movieId) {
        if(!user) {
            toast.error("Must sign in first")
            return
        }
        
        await updateMovie(isFavorite, movieId)

        if(isFavorite) {
            setHeartActive((prev) => !prev)  
        }

        if(!isFavorite) {
            setBookmarkActive((prev) => !prev)  
        }
    }

    useEffect(()=> {
        if(!user) {
            return
        }

        async function toggleSymbol() {
            const isFav = await containsMovie("favorites", imdbID)
            const isBookmarked = await containsMovie("bookmarks", imdbID)

            if(isFav) {
                setHeartActive(true)
            } 

            if(isBookmarked) {
                setBookmarkActive(true)
            }
        }  

        toggleSymbol()
    }, [])

    return (
        <article className="group relative h-[430px] w-[250px] bg-black rounded-lg shadow-lg">
            <div className="mb-2 overflow-hidden bg-white">
                <Link to={`/movies/${imdbID}`}>
                    {Poster !== "N/A" ? 
                    <img 
                    className="object-fit h-[350px] w-full rounded-tr-lg hover:brightness-75" 
                    src={Poster} alt={`${Title} poster`}/> : 
                    <img 
                    className="object-fit h-[350px] w-full rounded-tr-lg hover:brightness-50" 
                    src={missingImage} alt={`${Title} poster`}/>}
                </Link>
                
            </div>
            <div className="text-white ml-2 mb-2 flex ">
                <Link to={`/movies/${imdbID}`}>
                    <h3 className="text-m font-bold items-center hover:underline">{(Title.length < 20) ? Title : Title.substring(0,17)+"..."} </h3>
                </Link>
                <h3 className="text-m font-bold items-center ml-2 mr-2 text-gray-400">({Year})</h3>
            </div>
            <div className="flex justify-between ml-5 mr-5">
                <FontAwesomeIcon onClick={() => futureToggle(true, imdbID)} className={heartActive ? "text-red-500 hover:text-red-700 size-5" :
                    "text-white hover:text-red-500 size-5" } icon={faHeart} />    
                <ReviewInput movieTitle={Title} movieId={imdbID} button={<FontAwesomeIcon className="text-white hover:text-blue-500 size-5" icon={faPenToSquare} />}/>
            </div>
            <div className="absolute top-0 left-0 z-10">        
                <FontAwesomeIcon onClick={() => futureToggle(false, imdbID)} className={bookmarkActive ? "text-yellow-500 hover:text-yellow-600 size-10" :
                    "text-gray-500 hover:text-yellow-500 size-10" } icon={faBookmark} />
            </div>
        </article>
    )
}
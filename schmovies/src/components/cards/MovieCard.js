import missingImage from "./noimage.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export default function MovieCard({movie}) {
    const { Title, Poster, Year } = movie

    return (
        <article className="group relative h-[430px] w-[250px] bg-black rounded-lg shadow-lg">
            <div className="mb-2 overflow-hidden bg-white">
                <Link to={`/movies/${Title}`}>
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
                <Link to={`/movies/${Title}`}>
                    <h3 className="text-m font-bold items-center hover:underline">{(Title.length < 20) ? Title : Title.substring(0,17)+"..."} </h3>
                </Link>
                <h3 className="text-m font-bold items-center ml-2 mr-2 text-gray-400">({Year})</h3>
            </div>
            <div className="flex justify-between ml-5 mr-5">
                <FontAwesomeIcon className="text-white hover:text-red-500 size-5" icon={faHeart} />
                <FontAwesomeIcon className="text-white hover:text-blue-500 size-5" icon={faPenToSquare} />
            </div>
            <div className="absolute top-0 left-0 z-10">        
                <FontAwesomeIcon className="text-gray-500 hover:text-yellow-300 size-10" icon={faBookmark} />
            </div>
        </article>
    )
}
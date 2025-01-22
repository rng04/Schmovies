import { faBookmark, faHeart, faStar } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import toast from "react-hot-toast";

export default function InfoBox({ props, movieId }) {
    const { user, updateMovie, containsMovie } = useContext(UserContext);
    const [heartActive, setHeartActive] = useState(false);
    const [bookmarkActive, setBookmarkActive] = useState(false);

    async function futureToggle(isFavorite, movieId) {
        try {
            await updateMovie(isFavorite, movieId);
            if (!user) return;

            if (isFavorite) {
                setHeartActive((prev) => !prev)
            } else {
                setBookmarkActive((prev) => !prev)
            }
        } catch (error) {
            toast.error("Error updating movie:", error);
        }
    }

    useEffect(() => {
        if (!user) return;

        let isMounted = true;
        async function toggleSymbol() {
            try {
                const isFav = await containsMovie("favorites", movieId);
                const isBookmarked = await containsMovie("bookmarks", movieId);

                if (isMounted && isFav) setHeartActive(true);
                if (isMounted && isBookmarked) setBookmarkActive(true);
            } catch (error) {
                console.error("Error fetching movie status:", error);
            }
        }

        toggleSymbol();
        return () => {
            isMounted = false;
        };
    }, [user, movieId]);

    return (
        <div className="text-white w-1/2">
            <div className="flex gap-1 pb-2">
                <h1 className="font-bold text-3xl">{props[0]}</h1>
                <h1 className="text-gray-300 font-medium text-3xl">{`(${props[1]})`}</h1>
            </div>
            <div className="flex items-center gap-4">
                <h3 className="font-medium pl-1 pr-1 border-white border-2 bg-black text-l">{`${props[2]}`}</h3>
                <h3>{props[3]}</h3>
                <li>{props[4]}</li>
                <li>{props[5]}</li>
            </div>
            <div className="m-2 flex gap-4 items-center">
                <div className="m-2 flex items-center gap-2 text-yellow-300">
                    <FontAwesomeIcon className="text-lg" icon={faStar} />
                    <p className="text-lg">{props[6]}</p>
                </div>
                <FontAwesomeIcon
                    onClick={() => futureToggle(false, movieId)}
                    className={`bg-black p-3 text-sm rounded-full opacity-80 ${
                        bookmarkActive ? "text-yellow-500 hover:text-yellow-600" : "hover:text-gray-400"
                    }`}
                    icon={faBookmark}
                />
                <FontAwesomeIcon
                    onClick={() => futureToggle(true, movieId)}
                    className={`bg-black p-3 text-sm rounded-full opacity-80 ${
                        heartActive ? "text-yellow-500 hover:text-yellow-600" : "hover:text-gray-400"
                    }`}
                    icon={faHeart}
                />
            </div>
            <div>
                <h1 className="font-bold text-xl pb-2">Plot Summary</h1>
                <p className="font-normal text-lg pb-2">{props[7]}</p>
                
                <h1 className="font-bold text-lg">Cast</h1>
                <h2 className="font-normal text-base pb-2">{props[8]}</h2>

                <h1 className="font-bold text-lg">Director</h1>
                <h2 className="font-normal text-base pb-2">{props[9]}</h2>

                <h1 className="font-bold text-lg">Writers</h1>
                <h2 className="font-normal text-base pb-2">{props[10]}</h2>
            </div>
        </div>
    );
}

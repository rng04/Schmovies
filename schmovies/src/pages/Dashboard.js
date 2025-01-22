import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        async function getSaved() {
            if (!user) return; // Ensure user is defined before making API calls

            try {
                // Correctly construct query parameters
                const favResponse = await axios.get(`/api/movies/get`, {
                    params: { userId: user._id, type: "favorites" },
                });
                const bkmkResponse = await axios.get(`/api/movies/get`, {
                    params: { userId: user._id, type: "bookmarks" },
                });

                // Extract data from response
                setFavorites(favResponse.data.favorites || []);
                setBookmarks(bkmkResponse.data.bookmarks || []);
            } catch (err) {
                console.error("Error fetching saved items:", err);
                toast.error("Failed to load saved items");
            }
        }

        getSaved();
    }, [user]); // Re-run effect if `user` changes

    return (
        <div>
            {user ? (
                <>
                    <h2 className="text-3xl font-semibold">Hi {user.username}!</h2>
                    
                    {/* Bookmarks Section */}
                    <h2 className="text-xl font-semibold">Bookmarks</h2>
                    <div>
                        <ul>
                            {bookmarks.length > 0 ? (
                                bookmarks.map((bookmark) => (
                                    <li key={bookmark}>
                                        <Link to={`/movies/${bookmark}`} className="text-blue-500 hover:underline">
                                            {bookmark}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p>No bookmarks found</p>
                            )}
                        </ul>
                    </div>
                    
                    {/* Favorites Section */}
                    <h2 className="text-xl font-semibold">Favorites</h2>
                    <div>
                        <ul>
                            {favorites.length > 0 ? (
                                favorites.map((favorite) => (
                                    <li key={favorite}>
                                        <Link to={`/movies/${favorite}`} className="text-blue-500 hover:underline">
                                            {favorite}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p>No favorites found</p>
                            )}
                        </ul>
                    </div>
                </>
            ) : (
                <h1>Sign in to save favorites and bookmarks!</h1>
            )}
        </div>
    );
}

import { useEffect, useState } from "react";
import MovieList from "../components/cards/MovieList";
import AppPage from "../components/page/AppPage";
import dummyData from "../dummyData.json";
import { useSearchParams } from "react-router-dom";
import IndexNavigation from "../components/page/IndexNavigation";

export default function Home() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("s");
    const [title, setTitle] = useState("Home");
    const [list, setList] = useState(dummyData);
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    function movePage(e) {
        setPage(e.target.value)
    }

    useEffect(() => {
        async function fetchMovies() {
            if (!searchQuery) {
                setTitle("Home")
                setList(dummyData)
                return;
            }
            
            try {
                const fetchResponse = await fetch(`http://localhost:5000/api/movies/search?title=${searchQuery}&page=${page}`)
                const searchData = await fetchResponse.json();
                const search = searchData.data.Search
                setMaxPage(searchData.maxPage)
                
                if (search && search.length > 0) {
                    setTitle(`Searches for "${searchQuery}"`);
                    setList(search);
                } else {
                    setTitle("No results found");
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        fetchMovies();
    }, [searchQuery,page]);

    return <AppPage title={title} content={
        <>
            <MovieList movieList={list} />
            <IndexNavigation  props={{page:page, maxPage:maxPage, movePage:movePage}}/>
        </>
    } />;
}

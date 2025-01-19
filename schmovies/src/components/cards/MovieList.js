import MovieCard from "./MovieCard"

export default function MovieList({movieList}) {
    return (
        <div className="grid grid-cols-5 gap-y-8">
            {
                movieList.map((movie) => {
                    return <MovieCard movie={movie}/>
                })
            }
        </div>
    )
}
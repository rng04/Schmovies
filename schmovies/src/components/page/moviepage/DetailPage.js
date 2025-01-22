import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dummyData from "../../../dummyData.json";
import missingImage from "../../cards/noimage.png";
import InfoBox from "./InfoBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewInput from "../../reviews/ReviewInput";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function DetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null); 

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchResponse = await fetch(`http://localhost:5000/api/movies/${id}`)
        const data = await fetchResponse.json()
        setData(data)
      } catch (err) {
        console.error(`ERROR: ${err}`);
      }
    }

    fetchData();
  }, [id]); // Dependency array ensures fetchData runs when id changes

  const { 
    Poster = missingImage,
    Title = "Loading...",
    Year = "",
    Rated = "",
    Released = "",
    Genre = "",
    Runtime = "",
    imdbRating = "",
    Plot = "",
    Actors = "",
    Director = "", 
    Writer = "",
    imdbID
  } = data || {}; // Ensure destructuring works even if data is null

  return (
    <>
      <div
        className="bg-blend-luminosity bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${Poster})`,
        }}
      >
        <div className="bg-slate-800 bg-opacity-50 flex p-5 gap-5 justify-center">  
          <img className="rounded-md bg-white" src={Poster} alt={`${id} Poster`} />
          <InfoBox props={[Title, Year, Rated, Released, Genre, Runtime, imdbRating, Plot, Actors, Director, Writer]} movieId={imdbID}/>    
        </div>
      </div>
      {/* Example for rendering multiple images */}
      <img className="rounded-md" src={Poster} alt={`${id} Poster`} />
      <ReviewInput movieTitle={Title} movieId={imdbID} button={
        <FontAwesomeIcon className="bg-black p-3 text-sm rounded-full opacity-80 hover:text-gray-400" icon={faPenToSquare}/>
      }/>
    </>
  );
}

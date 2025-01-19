import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const searchQuery = formData.get("s"); 

    if (searchQuery) {
      navigate(`/?s=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form className="mt-4 ml-4" onSubmit={handleSubmit}>
      <input
        className="text-black"
        name="s"
        placeholder="enter a movie title..."
      />
      <button className="ml-4 hover:text-yellow-200" type="submit">
        <FontAwesomeIcon icon={faSearch}/>
      </button>
    </form>
  );
}

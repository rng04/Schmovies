import { faBookmark, faHeart, faPenToSquare, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InfoBox({props}) {
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
                    <FontAwesomeIcon className="text-lg" icon={faStar}/>
                    <p className="text-lg">{props[6]}</p>
                 </div>
                <FontAwesomeIcon className="bg-black p-3 text-sm  rounded-full opacity-80 hover:text-gray-400" icon={faBookmark}/>
                <FontAwesomeIcon className="bg-black p-3 text-sm  rounded-full opacity-80 hover:text-gray-400" icon={faHeart}/>
                <FontAwesomeIcon className="bg-black p-3 text-sm  rounded-full opacity-80 hover:text-gray-400" icon={faPenToSquare}/>
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
    )
}
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import axios from 'axios'
import { useContext, useState } from 'react'
import ReactStars from 'react-stars'
import { UserContext } from '../../context/userContext'
import toast from 'react-hot-toast'

export default function ReviewInput({movieTitle, movieId, button}) {
    const [inputValue, setInputValue] = useState("")
    const [stars, setStars] = useState(1)
    const [starColor, setStarColor] = useState("text-red-500")
    const {user} = useContext(UserContext)

    const handleStarChange = (value) => {
        setStars(value)

        if(value<=3) {
            setStarColor("text-red-500")
        } else if (value <=6) {
            setStarColor("text-yellow-500")
        } else if (value <= 9) { 
            setStarColor("text-lime-500")
        } else {
            setStarColor("text-cyan-500 animate-bounce")
        }
    } 

    const handleSendReview = async () => {
        try {
            const response = await axios.post("/api/movies/addreview", {
                userId:user._id,
                movieId:movieId,
                content:inputValue,
                stars:stars
            })

            toast.success(`Review sent for ${movieTitle}`)
        } catch (error) {
            toast.error("Failed to save review")
        }
    }

    return (
        <div className="flex justify-center">
        <div className="flex gap-8">
            <Popover>
            <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">   
                {button}
            </PopoverButton>
            <PopoverPanel
                transition
                anchor="bottom"
                className="divide-y divide-white/5 rounded-xl bg-black/90 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
                <div className="p-5">
                    <span className={`flex gap-2 font-bold justify-center items-center ${starColor}`}>
                        <FontAwesomeIcon className={`text-lg transition ease-in-out delay-100`} icon={faStar}/>
                        <p className='text-lg text-white'>{stars}</p>
                    </span>	
                    <ReactStars count={10}
                    value={stars}
                    onChange={handleStarChange}
                    size={24}
                    color2={'#ffd700'}
                    half={false} />
                    <textarea
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`Type your review for "${movieTitle}" here...`}
                        className="mt-2 w-full h-full p-4 resize-none text-white bg-black border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 overflow-x-hidden"
                    />
                    <button className='text-white float-right pb-2 hover:text-gray-400' onClick={handleSendReview}>Submit</button>
                </div>
            </PopoverPanel>
            </Popover>
        </div>
        </div>
    )
}
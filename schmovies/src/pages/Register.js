import axios from "axios";
import {toast} from 'react-hot-toast'
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Register() {
    const navigate = useNavigate()
    const {signIn} = useContext(UserContext)

    const [data,setData] = useState({
        email:'',
        username:'',
        password:''
    })

    const registerUser = async e => {
        e.preventDefault()
        const {email,username,password} = data

        try {
            const {data} = await axios.post('/register', {
                email,username,password
            })

            if(data.error) { 
                toast.error(data.error) 

            }
            else {
                signIn(data)
                //reset form to default values
                setData({})
                toast.success('Registration Successful. Welcome!')
                navigate('/')
            }
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="flex p-5 justify-center">
            <form className="border-gray-400 border-2 p-7 grid grid-cols-1 gap-4 w-1/6 rounded-md shadow-lg">
                <label className="font-bold text-2xl">Sign Up</label>
                <input className="border-2 border-black p-1 rounded-md" type="text" name="email" placeholder="Enter email..."
                value={data.email} onChange={e => setData({...data, email: e.target.value})}/>
                <input className="border-2 border-black p-1 rounded-md" type="text" name="username" placeholder="Create a username..."
                value={data.username} onChange={e => setData({...data, username: e.target.value})}/>
                <input className="border-2 border-black p-1 rounded-md" type="password" name="password" placeholder="Create a password..."
                value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md" onClick={registerUser}>Register</button>
                <Link to="/login" className="text-blue-400 hover:underline">Have an account? Log in here</Link>
            </form>
        </div>
    )
}
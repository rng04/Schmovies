import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { UserContext } from "../context/userContext";

export default function Login() {
    const navigate = useNavigate()
    const {signIn} = useContext(UserContext)
    const [data,setData] = useState({
            email:'',
            password:''
    })

    const loginUser = async e => {
        e.preventDefault()
        const {email,password} = data 
        try {
            const {data} = await axios.post('/login', {
                email,
                password
            })

            if(data.error) {
                toast.error(data.error)
            } else {
                //reset form to default values
                signIn(data)
                setData({})
                toast.success(`Logged in! Welcome!`)
                navigate('/dashboard')
            }
        } catch (error) {

        }
    }

    return (
        <div className="flex p-5 justify-center">
            <form className="border-gray-400 border-2 p-7 grid grid-cols-1 gap-4 w-1/6 rounded-md shadow-lg">
                <label className="font-bold text-2xl">Login</label>
                <input className="border-2 border-black p-1 rounded-md" type="text" name="username" placeholder="Enter email..."
                value={data.email} onChange={e => setData({...data, email: e.target.value})}/>
                <input className="border-2 border-black p-1 rounded-md" type="password" name="password" placeholder="Enter password..."
                value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
                <button type="submit" onClick={loginUser} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md">Sign In</button>
                <Link to="/register" className="text-blue-400 hover:underline">Create an account...</Link>
            </form>
        </div>
    )
}